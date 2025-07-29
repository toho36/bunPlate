import { describe, it, expect } from "vitest";
import {
  cn,
  formatDate,
  formatRelativeTime,
  debounce,
  throttle,
  generateRandomString,
  slugify,
  capitalize,
  formatBytes,
  isValidEmail,
  isValidUrl,
  copyToClipboard,
  sleep,
  range,
  groupBy,
  unique,
  chunk,
  omit,
  pick,
} from "../utils";

describe("cn", () => {
  it("combines class names correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("handles conditional classes", () => {
    expect(cn("text-red-500", false && "bg-blue-500")).toBe("text-red-500");
  });

  it("merges conflicting Tailwind classes", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("formatDate", () => {
  it("formats date correctly", () => {
    const date = new Date("2023-12-25");
    expect(formatDate(date)).toBe("December 25, 2023");
  });

  it("handles string dates", () => {
    expect(formatDate("2023-12-25")).toBe("December 25, 2023");
  });
});

describe("formatRelativeTime", () => {
  it("returns 'just now' for recent dates", () => {
    const now = new Date();
    expect(formatRelativeTime(now)).toBe("just now");
  });

  it("formats hours correctly", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoHoursAgo)).toBe("2 hours ago");
  });
});

describe("debounce", () => {
  it("delays function execution", async () => {
    let callCount = 0;
    const debouncedFn = debounce(() => callCount++, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(callCount).toBe(0);
    
    await sleep(150);
    expect(callCount).toBe(1);
  });
});

describe("throttle", () => {
  it("limits function calls", async () => {
    let callCount = 0;
    const throttledFn = throttle(() => callCount++, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(callCount).toBe(1);
    
    await sleep(150);
    throttledFn();
    expect(callCount).toBe(2);
  });
});

describe("generateRandomString", () => {
  it("generates string of correct length", () => {
    const randomString = generateRandomString(10);
    expect(randomString.length).toBe(10);
  });

  it("generates different strings", () => {
    const string1 = generateRandomString(10);
    const string2 = generateRandomString(10);
    expect(string1).not.toBe(string2);
  });
});

describe("slugify", () => {
  it("converts text to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("handles special characters", () => {
    expect(slugify("Hello, World! 123")).toBe("hello-world-123");
  });

  it("removes multiple spaces", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });
});

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("formatBytes", () => {
  it("formats bytes correctly", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1048576)).toBe("1 MB");
  });

  it("respects decimal places", () => {
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
  });
});

describe("isValidEmail", () => {
  it("validates correct emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("test@")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
  });
});

describe("isValidUrl", () => {
  it("validates correct URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://localhost:3000")).toBe(true);
  });

  it("rejects invalid URLs", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
    expect(isValidUrl("ftp://example")).toBe(false);
  });
});

describe("sleep", () => {
  it("waits for specified time", async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(95); // Allow for small timing variations
  });
});

describe("range", () => {
  it("creates array of specified length", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("handles zero length", () => {
    expect(range(0)).toEqual([]);
  });
});

describe("groupBy", () => {
  it("groups array by key", () => {
    const items = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
      { type: "vegetable", name: "carrot" },
    ];

    const grouped = groupBy(items, "type");
    expect(grouped.fruit).toHaveLength(2);
    expect(grouped.vegetable).toHaveLength(1);
  });
});

describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it("handles strings", () => {
    expect(unique(["a", "b", "b", "c"])).toEqual(["a", "b", "c"]);
  });
});

describe("chunk", () => {
  it("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("handles exact divisions", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });
});

describe("omit", () => {
  it("omits specified keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
  });

  it("handles multiple keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ["a", "c"])).toEqual({ b: 2 });
  });
});

describe("pick", () => {
  it("picks specified keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("handles non-existent keys", () => {
    const obj = { a: 1, b: 2 };
    expect(pick(obj, ["a", "c" as keyof typeof obj])).toEqual({ a: 1 });
  });
});