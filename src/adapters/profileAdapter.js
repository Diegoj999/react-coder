export const userInfo = (name) => {
  return {
    displayName: name,
    photoURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU",
  };
};

export const profileInfo = (id) => {
  return {
    id: id,
    phoneNumber: "",
    city: "",
  };
};
