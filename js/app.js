// ---------- Supabase config ----------


supabase = supabase.createClient(
  "https://lsnwqvvhecpltfygjuhw.supabase.co",
  'sb_publishable_KH9p68D3_PevlnQJdYn_wg_T4SoN8bW'
);

// Initialize client using the CDN global
supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function init() {
  // Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    // Redirect to login if not logged in
    window.location.href = "login.html";
    return;
  }

  // Add event listener for save
  const saveBtn = document.getElementById("saveBtn");
  const statusP = document.getElementById("status");
  saveBtn.addEventListener("click", async () => {
    const content = document.getElementById("content").value;
    if (!content) return;

    const { data, error } = await supabase
      .from("test_table")
      .insert({ content });

    statusP.textContent = error ? error.message : "Saved successfully!";
  });
}

init();