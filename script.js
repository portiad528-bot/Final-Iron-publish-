const workouts = {
  lose: {
    none: ["Jumping Jacks x30", "Squats x15", "Push-ups x12", "Lunges x20", "Jog 20min"],
    basic: ["Skipping 5min", "Dumbbell Squats x15", "Rows x12", "Plank 30s"],
    full: ["Treadmill 10min", "Leg Press x10", "Bench Press x12", "Crunches x15"]
  },
  gain: {
    none: ["Plank 30s", "Push-ups x15", "Bulgarian Squats x10", "Pike Push-ups x12"],
    basic: ["Jog 5min", "Bench Press x8", "Squats x10", "Rows x12"],
    full: ["Bike 10min", "Deadlifts x8", "Bench Press x10", "Pull-ups x12"]
  },
  maintain: {
    none: ["Squats x10", "Push-ups x10", "Plank 30s"],
    basic: ["Curls x12", "Press x10", "Squats x10"],
    full: ["Machine Press x10", "Lat Pulldown x10", "Leg Curls x15"]
  }
};

const warmups = [
  "Dynamic Stretch 5 min",
  "Torso Twist + Arm Circles 2 min",
  "Jog in Place 3 min"
];

const stretches = [
  "Hamstring Stretch 30s per side",
  "Quad Stretch 30s each leg",
  "Deep Breathing 1 min"
];

const nutrition = {
  lose: "Eat in a calorie deficit — more greens, protein, and water 💧",
  gain: "Eat in a surplus — add rice, oats, eggs, and meat 🥩",
  maintain: "Eat balanced meals — protein + carbs + veggies 🍎"
};

document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("generateBtn");
  btn.addEventListener("click", () => {
    const goal = document.getElementById("goal").value;
    const equipment = document.getElementById("equipment").value;
    const level = document.getElementById("level").value;

    const plan = document.getElementById("plan");
    const warmupDiv = document.getElementById("warmup");
    const workoutList = document.getElementById("workoutList");
    const stretchDiv = document.getElementById("stretch");
    const nutritionDiv = document.getElementById("nutrition");

    if (!goal) {
      alert("Please select your goal!");
      return;
    }

    warmupDiv.innerHTML = `<h3>Warm-up</h3><p>${warmups[Math.floor(Math.random() * warmups.length)]}</p>`;
    workoutList.innerHTML = "";
    workouts[goal][equipment].forEach((w) => {
      const li = document.createElement("li");
      li.textContent = `${w}${level === "hardcore" ? "🔥" : ""}`;
      workoutList.appendChild(li);
    });
    stretchDiv.innerHTML = `<h3>Stretching</h3><p>${stretches[Math.floor(Math.random() * stretches.length)]}</p>`;
    nutritionDiv.innerHTML = `<h3>Nutrition Tip</h3><p>${nutrition[goal]}</p>`;
    plan.classList.remove("hidden");
  });
});