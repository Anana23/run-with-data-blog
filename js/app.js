// ---------- Supabase config ----------
const SUPABASE_URL = "https://lsnwqvvhecpltfygjuhw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KH9p68D3_PevlnQJdYn_wg_T4SoN8bW";

const supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ---------- DOM elements ----------
const appSection = document.getElementById("app");
const statusP = document.getElementById("status");
const loginBtn = document.getElementById("loginBtn");
const saveBtn = document.getElementById("saveBtn");

// ---------- Check auth & toggle UI ----------
async function updateUI() {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    appSection.style.display = "block";
  } else {
    appSection.style.display = "none";
  }
}

// ---------- Login / signup ----------
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Try login
  let { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  // If user doesn't exist, sign up
  if (error) {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      alert(signUpError.message);
      return;
    }
  }

  await updateUI();
}

// ---------- Insert text ----------
async function saveText() {
  const content = document.getElementById("content").value;

  const { error } = await supabase
    .from("test_table")
    .insert({ content });

  statusP.textContent = error ? error.message : "Saved successfully!";
}

// ---------- Event listeners ----------
loginBtn.addEventListener("click", login);
saveBtn.addEventListener("click", saveText);

// ---------- React to auth changes ----------
supabase.auth.onAuthStateChange(() => {
  updateUI();
});

// ---------- Initial check on page load ----------
updateUI();
