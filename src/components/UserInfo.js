const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <div className="user-info">Usuário não encontrado</div>;
  }

  return (
    <div className="user-info">
      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserInfo;
