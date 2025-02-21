export async function checkAuth() {
  const res = await fetch('http://localhost:8000/profile/api/check-auth/', {
    credentials: 'include',
  });
  return await res.json();
}

export async function handleLogout() {
  await fetch("http://localhost:8000/profile/logout/", {
    method: "GET", // Use GET instead of POST
    credentials: "include",
  });
  window.location.href = "http://localhost:8000/profile/login/?next=http://localhost:3000";
}
