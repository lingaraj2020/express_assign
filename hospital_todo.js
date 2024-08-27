const express = require("express");
const app = express();
app.use(express.json());

const users = [
  {
    name: "kirath",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: false,
      },
    ],
  },
  {
    name: "lingaraj",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: false,
      },
    ],
  },
  {
    name: "prajwal",
    kidneys: [
      {
        healthy: true,
      },
    ],
  },
  {
    name: "goutham",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", function (req, res) {
  const results = users.map((user) => {
    const healthykidneys = user.kidneys.filter((kidney) => kidney.healthy);
    const noofhealthykidneys = healthykidneys.length;
    const noofkidneys = user.kidneys.length;
    const noofunhealthykidneys = noofkidneys - noofhealthykidneys;

    return {
      name: user.name,
      noofkidneys,
      noofhealthykidneys,
      noofunhealthykidneys,
    };
  });
  res.json(results);
});
app.post("/", function (req, res) {
  const isheaalthy = req.body.ishealthy;
  users[0].kidneys.push({
    healthy: isheaalthy,
  });
  res.json({
    msg: "Done!",
  });
});
app.get("/all", function (req, res) {
  res.json({
    users,
  });
});
app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});
app.delete("/", function (req, res) {
  if (isThereatleastunhealthykidney()) {
    users[0].kidneys = users[0].kidneys.filter((kidney) => kidney.healthy);
    res.json({
      msg: "unhealthy kidneys removed",
    });
  }else{
    res.status(411).json({
        msg:"there is no unhealthy kidneys!"
    })
  }
});
function isThereatleastunhealthykidney() {
  let atleastkidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastkidney = true;
    }
  }
  return atleastkidney;
}
app.listen(3000);
