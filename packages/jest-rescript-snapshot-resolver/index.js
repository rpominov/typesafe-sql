const { sep } = require("path");

const fixSep = (path) => path.split("/").join(sep);

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    const pattern = fixSep("/lib/js/tests/");

    // Make sure the input path looks as we expect
    if (testPath.split(pattern).length !== 2) {
      throw new Error(
        "Cannot turn a test path into a snapshot path: " + testPath
      );
    }

    return (
      testPath.replace(pattern, fixSep("/tests/")).replace(".bs.js", ".res") +
      snapshotExtension
    );
  },
  resolveTestPath: (snapshotPath, snapshotExtension) => {
    const pattern = fixSep("/tests/");

    // Make sure the input path looks as we expect
    if (snapshotPath.split(pattern).length !== 2) {
      throw new Error(
        "Cannot turn a snapshot path into a test path: " + snapshotPath
      );
    }

    return snapshotPath
      .replace(pattern, fixSep("/lib/js/tests/"))
      .replace(".res", ".bs.js")
      .slice(0, -snapshotExtension.length);
  },
  testPathForConsistencyCheck: fixSep("/root/lib/js/tests/Main.test.bs.js"),
};
