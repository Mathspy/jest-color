import exact from "../exact";

expect.extend(exact.symmetric);
delete expect.toBeColor;
delete expect.not.toBeColor;
Object.entries(exact.asymmetric).forEach(([name, Class]) => {
  expect[name] = (...expected) => new Class(false, ...expected);
  expect.not[name] = (...expected) => new Class(true, ...expected);
});

describe("exact", () => {
  describe("symmetric", () => {
    it("will fail if color can't be parsed", () => {
      expect(() => expect("not a color").toBeColor("#000000")).toThrow(
        /parse/i,
      );
      expect(() => expect("#000000").toBeColor("not a color")).toThrow(
        /parse/i,
      );
    });

    it("can compare colors to themselves", () => {
      expect("#7db2ceff").toBeColor("#7db2ceff");
      expect([114, 81, 14, 1]).toBeColor(114, 81, 14, 1);
      expect("rgb(24, 75, 239, 0.5)").toBeColor("rgb(24, 75, 239, 0.5)");
      expect("hsla(360, 100%, 50%)").toBeColor("hsla(360, 100%, 50%)");
      expect("hwb(60, 3%, 60%)").toBeColor("hwb(60, 3%, 60%)");
    });

    it("can compare compare colors from same space even with different syntaxes", () => {
      expect("#7db2ceff").toBeColor(125, 178, 206);
      expect("#72510e").toBeColor(114, 81, 14, 1);
      expect([157, 204, 97]).toBeColor("#9dcc61");
      expect([24, 75, 239]).toBeColor("rgb(24, 75, 239)");
      expect([24, 75, 239, 0.5]).toBeColor("rgb(24, 75, 239, 0.5)");
      expect("rgb(51, 159, 40, 0.32)").toBeColor([51, 159, 40, 0.32]);
      expect("blue").toBeColor("#0000ffff");

      expect("#7db2caff").not.toBeColor(125, 178, 206, 1);
      expect("#7db2caaa").not.toBeColor(125, 178, 202);

      expect("hsl(360, 100%, 50%)").toBeColor("hsla(360, 100%, 50%, 1)");
      expect("hsl(360, 100%, 50%)").not.toBeColor("hsla(360, 100%, 50%, 0.4)");

      expect("hwb(60, 3%, 60%)").toBeColor("hwb(60, 3%, 60%, 1)");
      expect("hwb(60, 3%, 60%)").not.toBeColor("hwb(60, 3%, 60%, 0.4)");
    });

    it("can compare compare colors from different spaces", () => {
      expect("#7db2cf").toBeColor("hsl(201, 46%, 65%)");
      expect("hwb(60, 3%, 60%)").toBeColor("rgb(102, 102, 8)");
      expect("#cccc0866").toBeColor("hwb(60, 3%, 20%, 0.4)");
      expect("hsla(114, 60%, 39%, 0.32)").toBeColor([52, 159, 40, 0.32]);
    });
  });

  describe("asymmetric", () => {
    it("will fail if color can't be parsed", () => {
      expect(() =>
        expect("not a color").toEqual(expect.color("#000000")),
      ).toThrow(/parse/i);
      expect(() =>
        expect("#000000").toEqual(expect.color("not a color")),
      ).toThrow(/parse/i);
    });

    it("can compare colors to themselves", () => {
      expect("#7db2ceff").toEqual(expect.color("#7db2ceff"));
      expect([114, 81, 14, 1]).toEqual(expect.color(114, 81, 14, 1));
      expect("rgb(24, 75, 239, 0.5)").toEqual(
        expect.color("rgb(24, 75, 239, 0.5)"),
      );
      expect("hsla(360, 100%, 50%)").toEqual(
        expect.color("hsla(360, 100%, 50%)"),
      );
      expect("hwb(60, 3%, 60%)").toEqual(expect.color("hwb(60, 3%, 60%)"));
    });

    it("can compare compare colors from same space even with different syntaxes", () => {
      expect("#7db2ceff").toEqual(expect.color(125, 178, 206));
      expect("#72510e").toEqual(expect.color(114, 81, 14, 1));
      expect([157, 204, 97]).toEqual(expect.color("#9dcc61"));
      expect([24, 75, 239]).toEqual(expect.color("rgb(24, 75, 239)"));
      expect([24, 75, 239, 0.5]).toEqual(expect.color("rgb(24, 75, 239, 0.5)"));
      expect("rgb(51, 159, 40, 0.32)").toEqual(
        expect.color([51, 159, 40, 0.32]),
      );
      expect("blue").toEqual(expect.color("#0000ffff"));

      expect("#7db2caff").toEqual(expect.not.color(125, 178, 206, 1));
      expect("#7db2caaa").toEqual(expect.not.color(125, 178, 202));

      expect("hsl(360, 100%, 50%)").toEqual(
        expect.color("hsla(360, 100%, 50%, 1)"),
      );
      expect("hsl(360, 100%, 50%)").toEqual(
        expect.not.color("hsla(360, 100%, 50%, 0.4)"),
      );

      expect("hwb(60, 3%, 60%)").toEqual(expect.color("hwb(60, 3%, 60%, 1)"));
      expect("hwb(60, 3%, 60%)").toEqual(
        expect.not.color("hwb(60, 3%, 60%, 0.4)"),
      );
    });

    it("can compare compare colors from different spaces", () => {
      expect("#7db2cf").toEqual(expect.color("hsl(201, 46%, 65%)"));
      expect("hwb(60, 3%, 60%)").toEqual(expect.color("rgb(102, 102, 8)"));
      expect("#cccc0866").toEqual(expect.color("hwb(60, 3%, 20%, 0.4)"));
      expect("hsla(114, 60%, 39%, 0.32)").toEqual(
        expect.color([52, 159, 40, 0.32]),
      );

      expect("#acbdef").toEqual(expect.not.color("hwb(60, 3%, 20%, 0.4)"));
      expect("hsla(123, 32%, 48%)").toEqual(
        expect.not.color([52, 159, 40, 0.32]),
      );
    });
  });
});
