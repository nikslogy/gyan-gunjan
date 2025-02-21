export async function checkAuth() {
  const res = await fetch('http://143.244.132.118/profile/api/check-auth/', {
    credentials: 'include',
  });
  return await res.json();
}

export async function handleLogout() {
  await fetch("http://143.244.132.118/profile/logout/", {
    method: "GET", // Use GET instead of POST
    credentials: "include",
  });
  window.location.href = "http://143.244.132.118/profile/login/?next=http://143.110.251.235";
}
