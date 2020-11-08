/* eslint-disable prefer-promise-reject-errors */
export const greater_than_zero = input => {
  return input > 0;
};

export const privkey = input => {
  return (
    input.length === 0 || (/^[0-9A-Fa-f]+$/.test(input) && input.length == 64)
  );
};

export const service_node_key = input => {
  return input.length === 64 && /^[0-9A-Za-z]+$/.test(input);
};

export const session_id = input => {
  return input.length === 66 && /^05[0-9A-Za-z]+$/.test(input);
};

// shortened Scalanet LNS name
export const scalanet_name = (input, scalaExt = false) => {
  let inputSafe = input || "";
  let maxLength = 32;

  if (inputSafe.includes("-")) {
    maxLength = 63;
  }

  let dashRule = !(
    inputSafe.length > 4 &&
    inputSafe.slice(2, 4) === "--" &&
    !(inputSafe.slice(0, 2) === "xn")
  );

  let reservedNames = ["localhost", "scala", "snode"];
  let regexCheck;
  if (scalaExt) {
    regexCheck = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.scala$/.test(inputSafe);
  } else {
    regexCheck = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(inputSafe);
  }
  return (
    inputSafe.length <= maxLength &&
    dashRule &&
    !reservedNames.includes(inputSafe) &&
    regexCheck
  );
};

export const session_name_or_scalanet_name = input => {
  const lcInput = input.toLowerCase();
  return session_name(lcInput) || scalanet_name(lcInput, true);
};

// Full scalanet address
export const scalanet_address = input => {
  return (
    input.length === 52 &&
    /^[ybndrfg8ejkmcpqxot1uwisza345h769]{51}[yo]$/.test(input)
  );
};

export const session_name = input => {
  return (
    input.length === 0 ||
    /^[a-z0-9_]([a-z0-9-_]*[a-z0-9_])?$/.test(input.toLowerCase())
  );
};

export const address = (input, gateway) => {
  if (!/^[0-9A-Za-z]+$/.test(input)) return false;

  // Validate the address
  return new Promise((resolve, reject) => {
    gateway.once("validate_address", data => {
      if (data.address && data.address !== input) {
        reject();
      } else {
        if (data.valid) {
          resolve();
        } else {
          reject();
        }
      }
    });
    gateway.send("wallet", "validate_address", {
      address: input
    });
  });
};
