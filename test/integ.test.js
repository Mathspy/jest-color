require("../dist/jest-color.cjs");

describe("All jest-color matchers should be there", () => {
  test("exact", () => {
    expect("hsla(114, 60%, 39%, 0.32)").toBeColor(52, 159, 40, 0.32);

    expect("hsla(114, 60%, 39%, 0.32)").toEqual(
      expect.color(52, 159, 40, 0.32),
    );

    expect("hsla(114, 60%, 39%, 0.32)").toEqual(expect.not.color(0, 0, 0, 0));
  });

  test("indistinguishable", () => {
    expect("#329e26").toBeIndistinguishableFrom(49, 155, 37);

    expect("#329e26").toEqual(expect.indistinguishableFrom(49, 155, 37));

    expect("#329e00").toEqual(expect.not.indistinguishableFrom(49, 155, 37));
  });
});
