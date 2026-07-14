const { supabase } = require("./supabaseClient");

async function addQuoteRow(row) {
  const newRow = {
    ...row,
    quoteText: typeof row.quoteText === 'string' ? JSON.parse(row.quoteText) : row.quoteText,
  };

  const { data, error } = await supabase
    .from("quotes")
    .insert([newRow])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function getAllQuotes() {
  const { data, error } = await supabase
    .from("quotes")
    .select(
      "id, clientName, clientEmail, clientPhone, organizerEmail, quoteText, createdAt",
    )
    .order("createdAt", { ascending: false });
  if (error) throw error;
  return data;
}

async function deleteQuote(id) {
  const { data, error } = await supabase.from("quotes").delete().eq("id", id);
  if (error) throw error;
  return { changes: Array.isArray(data) ? data.length : 0 };
}

async function addClient(client) {
  const clientRow = {
    ...client,
    created_at: client.createdAt || client.created_at || new Date().toISOString(),
  };
  delete clientRow.createdAt;

  const { data, error } = await supabase
    .from("clients")
    .insert([clientRow])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function getClientByEmail(email) {
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, email, password, created_at")
    .eq("email", email)
    .maybeSingle();
  if (error) throw error;
  return data;
}

module.exports = {
  addQuoteRow,
  getAllQuotes,
  deleteQuote,
  addClient,
  getClientByEmail,
};
