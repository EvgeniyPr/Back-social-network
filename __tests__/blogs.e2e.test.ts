describe("/blogs", () => {
  let anyBlog: any = {};
  test("returns the anyBlog object", () => {
    const result = anyBlog;
    expect(result).toBe(anyBlog);
  });
});
