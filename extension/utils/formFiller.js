const fillInput = (
  element,
  value
) => {

  if (
    !element ||
    !value
  ) return;

  element.focus();

  element.value = value;

  element.dispatchEvent(
    new Event("input", {
      bubbles: true
    })
  );

  element.dispatchEvent(
    new Event("change", {
      bubbles: true
    })
  );

  element.blur();
};