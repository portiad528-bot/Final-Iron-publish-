// IronMind for Him - script.js
// Handles UI, Mech Xecute animation, workout generation and nutrition

document.addEventListener('DOMContentLoaded', () => {
  // DOM refs
  const generateBtn = document.getElementById('generateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const xecuteEl = document.getElementById('xecute');
  const workoutList = document.getElementById('workoutList');
  const warmupEl = document.getElementById('warmup');
  const nutritionEl = document.getElementById('nutrition');
  const planMeta = document.getElementById('planMeta');
  const motivateBox = document.getElementById('motivateBox');
  const motivationEl = document.getElementById('motivation');

  // motivation lines
  const quotes = [
    "No excuses. Just results.",
    "Train hard. Stay humble.",
    "Discipline beats motivation.",
    "Be stronger than your excuses.",
    "Every rep builds a stronger mind."
  ];
  setInterval(() => {
    motivationEl.textContent = quotes[Math.floor(Math.random()*quotes.length)];
  }, 4500);

  // basic workout database tailored for male focus
  const db = {
    bulk: {
      full: [
        {name:"Barbell Squat / Goblet Squat", sets:"4×6–8", time:"Strength", why:"Builds lower body power and mass"},
        {name:"Bench Press / Push-Ups (weighted)", sets:"4×6–8", time:"Strength", why:"Chest hypertrophy & pressing strength"},
        {name:"Bent-Over Row / Dumbbell Row", sets:"4×6–8", time:"Strength", why:"Back density & posture"},
        {name:"Romanian Deadlift / Hip Hinge", sets:"3×8", time:"Strength", why:"Hamstrings & posterior chain growth"},
        {name:"Farmer Carry / Loaded Carry", sets:"3×40s", time:"Conditioning", why:"Grip, core, and total-body tension"}
      ],
      upper: [
        {name:"Bench Press", sets:"4×6–8", time:"Strength", why:"Chest mass"},
        {name:"Overhead Press", sets:"4×6–8", time:"Strength", why:"Shoulder thickness"},
        {name:"Pull-Up / Lat Pull", sets:"4×6–8", time:"Strength", why:"Back width"},
        {name:"Dumbbell Curl", sets:"3×8–10", time:"Accessory", why:"Arms size"}
      ],
      lower: [
        {name:"Back Squat / Goblet Squat", sets:"4×6–8", time:"Strength", why:"Quad & glute mass"},
        {name:"Deadlift / Romanian", sets:"3×5–6", time:"Strength", why:"Posterior chain"},
        {name:"Walking Lunges", sets:"3×12 each leg", time:"Hypertrophy", why:"Single-leg strength"},
        {name:"Calf Raises", sets:"3×15", time:"Accessory", why:"Calf development"}
      ],
      core: [
        {name:"Weighted Sit-ups", sets:"3×12", time:"Accessory", why:"Core hypertrophy"},
        {name:"Hanging Leg Raises", sets:"3×10", time:"Core", why:"Lower abs & hip flexors"},
        {name:"Plank", sets:"3×60s", time:"Stability", why:"Bracing & posture"}
      ]
    },
    cut: {
      full: [
        {name:"Circuit - Bodyweight", sets:"4 rounds", time:"30–35 min", why:"Burns calories & conditions"},
        {name:"High-Rep Squats", sets:"3×20", time:"Hypertrophy/Cardio", why:"Leg endurance & calorie burn"},
        {name:"Push-up AMRAP", sets:"3×(max reps)", time:"Conditioning", why:"Upper body endurance"},
        {name:"Jump Rope", sets:"5×1 min", time:"Cardio", why:"Fat-burning intervals"}
      ],
      upper: [
        {name:"Incline Push-ups", sets:"4×12", time:"Hypertrophy", why:"Upper chest tone"},
        {name:"Band Row or Dumbbell Row", sets:"4×12", time:"Tone", why:"Back endurance"},
        {name:"Chair Dips", sets:"3×15", time:"Accessory", why:"Triceps tone"}
      ],
      lower: [
        {name:"Jump Squats", sets:"4×15", time:"Plyo", why:"Explosive calorie burn"},
        {name:"Walking Lunges", sets:"3×15 each", time:"Cardio", why:"Leg stamina"},
        {name:"Glute Bridges", sets:"3×20", time:"Accessory", why:"Glute activation"}
      ],
      core: [
        {name:"Mountain Climbers", sets:"4×40s", time:"Core/Cardio", why:"High intensity core work"},
        {name:"Bicycle Crunches", sets:"3×30", time:"Core", why:"Oblique engagement"},
        {name:"Russian Twists", sets:"3×30", time:"Core", why:"Rotational strength"}
      ]
    },
    fit: {
      full: [
        {name:"Mix Circuit (cardio + strength)", sets:"3 rounds", time:"30 min", why:"Balanced fitness"},
        {name:"Kettlebell Swings / Hip Hinge", sets:"3×15", time:"Power & cardio", why:"Posterior chain & conditioning"},
        {name:"Push-ups", sets:"3×12", time:"Strength", why:"Upper body endurance"},
        {name:"Bodyweight Squats", sets:"3×20", time:"Leg conditioning", why:"Leg stamina"}
      ],
      upper: [
        {name:"Push-ups", sets:"3×15", time:"Tone", why:"Upper body endurance"},
        {name:"Inverted Rows", sets:"3×12", time:"Back", why:"Back & posture"},
        {name:"Shoulder Taps", sets:"3×40s", time:"Core", why:"Stability"}
      ],
      lower: [
        {name:"Goblet Squat", sets:"3×12", time:"Tone", why:"Legs & glutes"},
        {name:"Step-ups", sets:"3×12 each", time:"Conditioning", why:"Unilateral strength"},
        {name:"Calf Raises", sets:"3×20", time:"Accessory", why:"Calf conditioning"}
      ],
      core: [
        {name:"Plank", sets:"3×60s", time:"Stability", why:"Core endurance"},
        {name:"Deadbug", sets:"3×12", time:"Core", why:"Anti-extension control"},
        {name:"Side Plank", sets:"3×45s", time:"Oblique", why:"Side stability"}
      ]
    }
  };

  // simple warmups and nutrition content
  const warmups = [
    "5 min light jog or march in place",
    "Arm circles + hip openers — 2 min",
    "Leg swings + dynamic lunges — 2 min",
    "Jump rope — 2 min"
  ];
  const nutrition = {
    bulk: {
      title: "Bulk — Nutrition (sample)",
      lines: [
        "Aim for a calorie surplus: +250–500 kcal/day",
        "Protein: 1.6–2.2 g per kg bodyweight (eggs, chicken, beef, fish)",
        "Carbs around workouts: rice, oats, potatoes",
        "Healthy fats: nuts, olive oil; hydrate 2–3 L/day"
      ]
    },
    cut: {
      title: "Cut — Nutrition (sample)",
      lines: [
        "Calorie deficit: −250–500 kcal/day",
        "High protein to preserve muscle: 1.6–2.0 g/kg",
        "Prioritize veggies and fiber; reduce sugary drinks",
        "Drink water often, aim for 2–3 L/day"
      ]
    },
    fit: {
      title: "Maintain — Nutrition (sample)",
      lines: [
        "Aim for maintenance calories; balanced macros",
        "Protein: ~1.4–1.8 g/kg; carbs for energy",
        "Include whole grains, lean protein, colorful veggies",
        "Hydrate and get sleep — recovery matters"
      ]
    }
  };

  // helper: create markup for a single workout card
  function createCard(ex, delayMs=0){
    const el = document.createElement('div');
    el.className = 'wcard';
    el.innerHTML = `<h4>${ex.name}</h4>
      <div class="meta"><strong>Do:</strong> ${ex.sets} • <strong>Type:</strong> ${ex.time}</div>
      <div class="why"><strong>Why:</strong> ${ex.why}</div>`;
    // add show class after delay
    setTimeout(()=> el.classList.add('show'), delayMs);
    return el;
  }

  // "Mech Xecute" animation controller
  function triggerXecuteSequence(callback){
    // activate visuals
    xecuteEl.classList.add('active');
    // short surge then show text then hide
    setTimeout(()=> {
      xecuteEl.classList.remove('active');
      if (typeof callback === 'function') callback();
    }, 950); // time matches CSS transitions
  }

  // generate plan
  generateBtn.addEventListener('click', () => {
    const age = parseInt(document.getElementById('age').value,10);
    const weight = parseFloat(document.getElementById('weight').value);
    const goal = document.getElementById('goal').value;
    const difficulty = document.getElementById('difficulty').value;
    const equipment = document.getElementById('equipment').value;
    const focus = document.getElementById('focus').value;

    // basic validation
    if (!age || !weight || !goal || !difficulty || !equipment || !focus) {
      alert('Fill all fields to generate your plan.');
      return;
    }

    // show mech animation, then build plan
    triggerXecuteSequence(()=> {
      // clear previous
      workoutList.innerHTML = '';
      warmupEl.innerHTML = '';
      nutritionEl.innerHTML = '';
      planMeta.innerHTML = '';

      // plan meta
      const days = difficulty === 'beginner' ? '3 per week' : difficulty === 'intermediate' ? '4–5 per week' : '5–6 per week';
      planMeta.innerHTML = `<strong>Age:</strong> ${age} • <strong>Weight:</strong> ${Math.round(weight)} kg • <strong>Goal:</strong> ${goal.toUpperCase()} • <strong>Difficulty:</strong> ${difficulty} • <strong>Days:</strong> ${days}`;

      // warmup
      const wu = warmups[Math.floor(Math.random()*warmups.length)];
      warmupEl.innerHTML = `<strong>Warm-up:</strong> ${wu}`;

      // pick dataset
      const dataset = db[ goal === 'bulk' ? 'bulk' : goal === 'cut' ? 'cut' : 'fit' ];
      // select which array based on focus
      const group = (focus && dataset[focus]) ? dataset[focus] : dataset.full;

      // tweak by difficulty: hardcore -> prefer lower-rep strength options, beginner -> slightly less volume
      let modifier = 0;
      if (difficulty === 'beginner') modifier = -1;
      if (difficulty === 'intermediate') modifier = 0;
      if (difficulty === 'hardcore') modifier = +1;

      // equipment handling: if none, map some exercises to bodyweight-friendly alternatives
      const mapped = group.map(item => {
        if (equipment === 'none') {
          // simple swaps
          return swapToBodyweight(item);
        } else if (equipment === 'basic') {
          // slight preference: keep but allow dumbbell alternatives already encoded in names
          return item;
        } else {
          // gym: keep as is
          return item;
        }
      });

      // order and adjust sets based on modifier
      const finalList = mapped.map((ex, idx) => {
        // adjust the set counts (naive but effective)
        const setsMatch = ex.sets; // just show provided sets; could adjust numbers programmatically if desired
        return {...ex, sets: setsMatch};
      });

      // show cards staggered
      finalList.forEach((ex, i) => {
        const delay = i * 160 + 200; // stagger
        const card = createCard(ex, delay);
        workoutList.appendChild(card);
      });

      // nutrition block
      const nutKey = goal === 'bulk' ? 'bulk' : goal === 'cut' ? 'cut' : 'fit';
      const nut = nutrition[nutKey];
      const nutHtml = `<h3>${nut.title}</h3><ul>${nut.lines.map(l => `<li>${l}</li>`).join('')}</ul>`;
      nutritionEl.innerHTML = nutHtml;

      // motivational tip
      const tips = [
        "Progress > Perfection. Add 1 rep next session.",
        "Sleep matters — aim for 7–9 hours.",
        "Consistency builds results. Show up 80% of the days."
      ];
      motivateBox.textContent = tips[Math.floor(Math.random()*tips.length)];
      // scroll plan into view
      document.getElementById('outputSection').scrollIntoView({behavior:'smooth'});
    });
  });

  // small helper: swap some exercises to bodyweight-friendly moves
  function swapToBodyweight(item){
    const name = item.name.toLowerCase();
    if (name.includes('squat') || name.includes('leg')) {
      return {...item, name: 'Bodyweight Squat / Jump Squat', sets: item.sets, why: item.why};
    }
    if (name.includes('deadlift') || name.includes('romanian')) {
      return {...item, name: 'Glute Bridge / Hip Thrust (Bodyweight)', sets: '3×12', why: 'Posterior chain — bodyweight friendly'};
    }
    if (name.includes('bench') || name.includes('press')) {
      return {...item, name: 'Push-ups (incline/decline variations)', sets: '4×8–15', why: 'Chest & triceps — bodyweight progression'};
    }
    if (name.includes('row') || name.includes('pull')) {
      return {...item, name: 'Inverted Row / Band Row', sets: '4×8–12', why: 'Back strength — bodyweight alternative'};
    }
    if (name.includes('carry') || name.includes('farmer')) {
      return {...item, name: 'Suitcase Carry / Heavy Hold (if possible)', sets: '3×30–40s', why: item.why};
    }
    // default fallback
    return {...item};
  }

  // reset
  resetBtn.addEventListener('click', () => {
    document.getElementById('age').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('goal').value = '';
    document.getElementById('difficulty').value = 'beginner';
    document.getElementById('equipment').value = 'none';
    document.getElementById('focus').value = 'full';
    workoutList.innerHTML = '';
    warmupEl.innerHTML = '';
    nutritionEl.innerHTML = '';
    planMeta.innerHTML = '';
    motivateBox.innerHTML = '';
    window.scrollTo({top:0,behavior:'smooth'});
  });

});