export default {
  methods: {
    getMinContribution(node) {
      const MAX_NUMBER_OF_CONTRIBUTORS = 4;
      // This is calculated in the same way it is calculated on the ScalaBlocks site
      const openContributionRemaining = this.openForContribution(node);
      const minContributionAtomicUnits =
        !node.funded && node.contributors.length < MAX_NUMBER_OF_CONTRIBUTORS
          ? openContributionRemaining /
            (MAX_NUMBER_OF_CONTRIBUTORS - node.contributors.length)
          : 0;
      const minContributionScala = minContributionAtomicUnits / 1e2;
      // ceiling to 4 decimal places
      return minContributionScala.toFixed(4);
    },
    openForContribution(node) {
      const openContributionRemaining =
        node.staking_requirement > node.total_reserved
          ? node.staking_requirement - node.total_reserved
          : 0;
      return openContributionRemaining;
    },
    openForContributionScala(node) {
      return (this.openForContribution(node) / 1e2).toFixed(4);
    }
  }
};
