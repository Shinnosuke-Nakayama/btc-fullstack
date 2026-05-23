export function Login() {
  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>ソロプロジェクト-仮</h2>
      <label htmlFor="name">Name</label>
      <input type="text" name="nameArea" id="nameArea" />
      <label htmlFor="password">Password</label>
      <input type="text" name="PassArea" id="PassArea" />
      <button>Login</button>
    </>
  );
}
