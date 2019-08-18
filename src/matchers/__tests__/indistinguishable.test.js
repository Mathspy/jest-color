import indistinguishable from "../indistinguishable";

expect.extend(indistinguishable.symmetric);
delete expect.toBeIndistinguishableFrom;
delete expect.not.toBeIndistinguishableFrom;
Object.entries(indistinguishable.asymmetric).forEach(([name, Class]) => {
  expect[name] = (...expected) => new Class(false, ...expected);
  expect.not[name] = (...expected) => new Class(true, ...expected);
});

describe("indistinguishable", () => {
  describe("symmetric", () => {
    it("will fail if color can't be parsed", () => {
      expect(() =>
        expect("not a color").toBeIndistinguishableFrom("#000000"),
      ).toThrow(/parse/i);
      expect(() =>
        expect("#000000").toBeIndistinguishableFrom("not a color"),
      ).toThrow(/parse/i);
    });

    it("can compare colors to themselves", () => {
      expect("#7db2ceff").toBeIndistinguishableFrom("#7db2ceff");
      expect([114, 81, 14, 1]).toBeIndistinguishableFrom(114, 81, 14, 1);
      expect("rgb(24, 75, 239, 0.5)").toBeIndistinguishableFrom(
        "rgb(24, 75, 239, 0.5)",
      );
      expect("hsla(360, 100%, 50%)").toBeIndistinguishableFrom(
        "hsla(360, 100%, 50%)",
      );
      expect("hwb(60, 3%, 60%)").toBeIndistinguishableFrom("hwb(60, 3%, 60%)");
    });

    it("can compare compare colors from same space even with different syntaxes", () => {
      // exact:
      expect("#7db2ceff").toBeIndistinguishableFrom(125, 178, 206);
      expect("#72510e").toBeIndistinguishableFrom(114, 81, 14, 1);
      expect([157, 204, 97]).toBeIndistinguishableFrom("#9dcc61");
      expect([24, 75, 239]).toBeIndistinguishableFrom("rgb(24, 75, 239)");
      expect([24, 75, 239, 0.5]).toBeIndistinguishableFrom(
        "rgb(24, 75, 239, 0.5)",
      );
      expect("rgb(51, 159, 40, 0.32)").toBeIndistinguishableFrom([
        51,
        159,
        40,
        0.32,
      ]);
      expect("blue").toBeIndistinguishableFrom("#0000ffff");

      expect("#7db2caff").not.toBeIndistinguishableFrom(125, 178, 206, 1);
      expect("#7db2caaa").not.toBeIndistinguishableFrom(125, 178, 202);

      expect("hsl(360, 100%, 50%)").toBeIndistinguishableFrom(
        "hsla(360, 100%, 50%, 1)",
      );
      expect("hsl(360, 100%, 50%)").not.toBeIndistinguishableFrom(
        "hsla(360, 100%, 50%, 0.4)",
      );

      expect("hwb(60, 3%, 60%)").toBeIndistinguishableFrom(
        "hwb(60, 3%, 60%, 1)",
      );
      expect("hwb(60, 3%, 60%)").not.toBeIndistinguishableFrom(
        "hwb(60, 3%, 60%, 0.4)",
      );

      // indistinguishable:
      expect("#329e26").toBeIndistinguishableFrom(49, 155, 37);
      expect([217, 223, 214]).toBeIndistinguishableFrom("rgb(216, 222, 215)");
    });

    it("can compare compare colors from different spaces", () => {
      // exact:
      expect("#7db2cf").toBeIndistinguishableFrom("hsl(201, 46%, 65%)");
      expect("hwb(60, 3%, 60%)").toBeIndistinguishableFrom("rgb(102, 102, 8)");
      expect("#cccc0866").toBeIndistinguishableFrom("hwb(60, 3%, 20%, 0.4)");
      expect("hsla(114, 60%, 39%, 0.32)").toBeIndistinguishableFrom([
        52,
        159,
        40,
        0.32,
      ]);

      // indistinguishable:
      expect("hsl(114, 61%, 38%)").toBeIndistinguishableFrom(49, 155, 37);
      expect("hwb(110, 84%, 13%)").toBeIndistinguishableFrom(
        "rgb(216, 222, 215)",
      );
    });
  });

  describe("asymmetric", () => {
    it("will fail if color can't be parsed", () => {
      expect(() =>
        expect("not a color").toEqual(expect.indistinguishableFrom("#000000")),
      ).toThrow(/parse/i);
      expect(() =>
        expect("#000000").toEqual(expect.indistinguishableFrom("not a color")),
      ).toThrow(/parse/i);
    });

    it("can compare colors to themselves", () => {
      expect("#7db2ceff").toEqual(expect.indistinguishableFrom("#7db2ceff"));
      expect([114, 81, 14, 1]).toEqual(
        expect.indistinguishableFrom(114, 81, 14, 1),
      );
      expect("rgb(24, 75, 239, 0.5)").toEqual(
        expect.indistinguishableFrom("rgb(24, 75, 239, 0.5)"),
      );
      expect("hsla(360, 100%, 50%)").toEqual(
        expect.indistinguishableFrom("hsla(360, 100%, 50%)"),
      );
      expect("hwb(60, 3%, 60%)").toEqual(
        expect.indistinguishableFrom("hwb(60, 3%, 60%)"),
      );
    });

    it("can compare compare colors from same space even with different syntaxes", () => {
      // exact:
      expect("#7db2ceff").toEqual(expect.indistinguishableFrom(125, 178, 206));
      expect("#72510e").toEqual(expect.indistinguishableFrom(114, 81, 14, 1));
      expect([157, 204, 97]).toEqual(expect.indistinguishableFrom("#9dcc61"));
      expect([24, 75, 239]).toEqual(
        expect.indistinguishableFrom("rgb(24, 75, 239)"),
      );
      expect([24, 75, 239, 0.5]).toEqual(
        expect.indistinguishableFrom("rgb(24, 75, 239, 0.5)"),
      );
      expect("rgb(51, 159, 40, 0.32)").toEqual(
        expect.indistinguishableFrom([51, 159, 40, 0.32]),
      );
      expect("blue").toEqual(expect.indistinguishableFrom("#0000ffff"));

      expect("#7db2caff").toEqual(
        expect.not.indistinguishableFrom(125, 178, 206, 1),
      );
      expect("#7db2caaa").toEqual(
        expect.not.indistinguishableFrom(125, 178, 202),
      );

      expect("hsl(360, 100%, 50%)").toEqual(
        expect.indistinguishableFrom("hsla(360, 100%, 50%, 1)"),
      );
      expect("hsl(360, 100%, 50%)").toEqual(
        expect.not.indistinguishableFrom("hsla(360, 100%, 50%, 0.4)"),
      );

      expect("hwb(60, 3%, 60%)").toEqual(
        expect.indistinguishableFrom("hwb(60, 3%, 60%, 1)"),
      );
      expect("hwb(60, 3%, 60%)").toEqual(
        expect.not.indistinguishableFrom("hwb(60, 3%, 60%, 0.4)"),
      );

      // indistinguishable:
      expect("#329e26").toEqual(expect.indistinguishableFrom(49, 155, 37));
      expect([217, 223, 214]).toEqual(
        expect.indistinguishableFrom("rgb(216, 222, 215)"),
      );
    });

    it("can compare compare colors from different spaces", () => {
      // exact:
      expect("#7db2cf").toEqual(
        expect.indistinguishableFrom("hsl(201, 46%, 65%)"),
      );
      expect("hwb(60, 3%, 60%)").toEqual(
        expect.indistinguishableFrom("rgb(102, 102, 8)"),
      );
      expect("#cccc0866").toEqual(
        expect.indistinguishableFrom("hwb(60, 3%, 20%, 0.4)"),
      );
      expect("hsla(114, 60%, 39%, 0.32)").toEqual(
        expect.indistinguishableFrom([52, 159, 40, 0.32]),
      );

      // indistinguishable:
      expect("hsl(114, 61%, 38%)").toEqual(
        expect.indistinguishableFrom(49, 155, 37),
      );
      expect("hwb(110, 84%, 13%)").toEqual(
        expect.indistinguishableFrom("rgb(216, 222, 215)"),
      );
    });
  });
});
