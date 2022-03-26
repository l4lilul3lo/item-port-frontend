const Reminder = () => {
  return (
    <>
      <h1>Hello</h1>
      <h4>
        We noticed you tried to register again. You already have an account with
        us!
      </h4>
      <h4>
        You can log in <a href="http://localhost:3000/login">here</a>
      </h4>
      <h4>
        If this wasn't you it was a bot, or someone mistyped their own email. In
        that case, you can ignore this email.
      </h4>
    </>
  );
};

export default Reminder;
