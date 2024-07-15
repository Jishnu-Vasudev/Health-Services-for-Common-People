document.getElementById('loginsubmit').addEventListener('click', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username-boxl').value;
  const password = document.getElementById('password-boxl').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (result.success) {
    window.location.href = `next.html?username=${encodeURIComponent(username)}`;
  } else {
    alert(result.message); // Display error message
  }
});

document.getElementById('registersubmit').addEventListener('click', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username-boxr').value;
  const password = document.getElementById('password-boxr').value;

  const response = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (result.success) {
    window.location.href = `next.html?username=${encodeURIComponent(username)}`;
  } else {
    alert(result.message); // Display error message
  }
});

// document.getElementById('registersubmit').addEventListener('click', async (event) => {
//   event.preventDefault();
//   const username = document.getElementById('username-boxr').value;
//   const password = document.getElementById('password-boxr').value;

//   const response = await fetch('/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ username, password })
//   });

//   const result = await response.json();

//   if (result.success) {
//     window.location.href = 'next.html';
//   } else {
//     alert(result.message);
//   }
// })
