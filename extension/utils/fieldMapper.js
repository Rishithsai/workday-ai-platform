const mapField = (
  label,
  data
) => {

  label =
    label.toLowerCase();

  // First Name
  if (
    label.includes(
      "first"
    ) ||
    label.includes(
      "given"
    )
  ) {
    return data.firstName;
  }

  // Last Name
  if (
    label.includes(
      "last"
    ) ||
    label.includes(
      "family"
    )
  ) {
    return data.lastName;
  }

  // Email
  if (
    label.includes(
      "email"
    )
  ) {
    return data.email;
  }

  // Phone
  if (
    label.includes(
      "phone"
    ) ||
    label.includes(
      "mobile"
    )
  ) {
    return data.phone;
  }

  // LinkedIn
  if (
    label.includes(
      "linkedin"
    )
  ) {
    return data.linkedin;
  }

  // Location
  if (
    label.includes(
      "location"
    ) ||
    label.includes(
      "city"
    )
  ) {
    return data.location;
  }

  return "";
};