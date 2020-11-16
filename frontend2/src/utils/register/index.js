function register(email) {
  // send to validate on the server
  const payload = { email: email };
  const request = new Request("/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return fetch(request).then(response => {
    if (response.status === 200) {
      return response.text();
    } else {
      console.log(response.error);
    }
  });
}

export default register;
