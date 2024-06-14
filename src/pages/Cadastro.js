import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

// Define the validation schema using zod
const cadastroSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    senha: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
      .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
      .regex(/[A-Z]/, {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[@#$%&*!?/\\|+\-_=]/, {
        message: "A senha deve conter pelo menos um caractere especial",
      })
      .regex(/^[^\u0308{}[\]`~^:;<>,“‘]+$/, {
        message: "A senha contém caracteres não permitidos",
      }),
    confirmacaoSenha: z.string().min(6, { message: "Confirme sua senha" }),
    cpf: z.string().min(11, { message: "CPF inválido" }),
    telefone: z.string().min(10, { message: "Telefone inválido" }),
    nome: z.string().min(2, { message: "Nome inválido" }),
    dataNascimento: z.preprocess(
      (arg) => {
        if (typeof arg === "string" || arg instanceof String) {
          return new Date(arg);
        }
        return arg;
      },
      z
        .date()
        .refine((date) => !isNaN(date.getTime()), { message: "Data inválida" })
    ),
    estadoCivil: z.string().min(1, { message: "Estado civil inválido" }),
    escolaridade: z.string().min(1, { message: "Escolaridade inválida" }),
  })
  .superRefine(({ senha, confirmacaoSenha }, ctx) => {
    if (senha !== confirmacaoSenha) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmacaoSenha"],
      });
    }
  });

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  const cadastrar = async (data) => {
    return await axios.post("http://localhost:5000/cadastro", data);
  };

  const onSubmit = async (data) => {
    try {
      cadastroSchema.parse(data);

      await cadastrar(data).then((res) => {
        if (res.data.status === "sucesso") {
          alert("Usuário cadastrado com sucesso!");
        } else {
          alert("Email já em uso!");
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join("\n"));
      } else {
        alert("Houve um erro na criação do usuário.");
      }
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" {...register("senha")} />
          {errors.senha && (
            <p className="error-message">{errors.senha.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmacaoSenha">Confirme sua Senha</label>
          <input
            type="password"
            id="confirmacaoSenha"
            {...register("confirmacaoSenha")}
          />
          {errors.confirmacaoSenha && (
            <p className="error-message">{errors.confirmacaoSenha.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" {...register("cpf")} />
          {errors.cpf && <p className="error-message">{errors.cpf.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input type="text" id="telefone" {...register("telefone")} />
          {errors.telefone && (
            <p className="error-message">{errors.telefone.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" {...register("nome")} />
          {errors.nome && (
            <p className="error-message">{errors.nome.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            {...register("dataNascimento")}
          />
          {errors.dataNascimento && (
            <p className="error-message">{errors.dataNascimento.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="estadoCivil">Estado Civil</label>
          <select id="estadoCivil" {...register("estadoCivil")}>
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
            <option value="viuvo">Viúvo</option>
          </select>
          {errors.estadoCivil && (
            <p className="error-message">{errors.estadoCivil.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="escolaridade">Escolaridade</label>
          <select id="escolaridade" {...register("escolaridade")}>
            <option value="">Selecione</option>
            <option value="fundamental">Fundamental</option>
            <option value="medio">Médio</option>
            <option value="superior">Superior</option>
            <option value="posGraduacao">Pós-Graduação</option>
          </select>
          {errors.escolaridade && (
            <p className="error-message">{errors.escolaridade.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
