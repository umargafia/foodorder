const FormatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(timestamp).toLocaleDateString('en-US', options);
};

export default FormatDate;
