function index(req, res) {
  res.json({
    message: "Recipes!",
    documentation_url: "https://github.com/jabad28/Project01-Recipes/blob/master/README.md",
    base_url: "https://safe-taiga-84155.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
