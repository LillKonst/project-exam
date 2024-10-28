const baseURL = process.env.REACT_APP_BASEURL;

const options = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey.data.key,
  },
};

const response = await fetch(`${baseURL}/venues`, options);
const data = await response.json();

try {
  const response = await fetch(`${NOROFF_API_URL}/social/posts`, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data; // Returnerer dataene til den som kaller funksjonen
} catch (error) {
  console.error('Fetch error:', error);
  throw error; // Kaster feilen videre til den som kaller funksjonen
}
};
