const profileQuery = `
{
  user {
    id
    login
    firstName
    lastName
  }

  xpTotal: transaction_aggregate(where: { type: { _eq: "xp" } }) {
    aggregate {
      sum {
        amount
      }
    }
  }

  xpByProject: transaction(where: { type: { _eq: "xp" } }) {
    amount
    createdAt
    object {
      name
      type
    }
  }

  auditUp: transaction_aggregate(where: { type: { _eq: "up" } }) {
    aggregate {
      sum {
        amount
      }
    }
  }
  auditDown: transaction_aggregate(where: { type: { _eq: "down" } }) {
    aggregate {
      sum {
        amount
      }
    }
  }

  progress {
    grade
    object {
      name
      type
      attrs
    }
  }
}
`;

async function fetchProfileData() {
  const token = localStorage.getItem("jwt"); // you saved this at login

  if (!token) {
    throw new Error("No JWT found. Please log in first.");
  }

  const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ query: profileQuery })
  });

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL Errors:", result.errors);
    throw new Error("Failed to fetch profile data");
  }

  return result.data;
}
