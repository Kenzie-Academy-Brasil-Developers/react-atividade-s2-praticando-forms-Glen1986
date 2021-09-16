import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState,useEffect } from 'react';
import LifeCicle from './components/LifeCycle'
//import { Switch, Route } from 'react-router-dom';

function App() {
  const [nome, setNome] = useState([]);
  const [email, setEmail] = useState([]);
  const [telephone, setTelephone] = useState([]);
  const [country, setCountry] = useState([]);
  const [birthDay, setBirthDay] = useState([]);
 
  /*
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [log, setLog] = useState("");
  */

  const formShema = yup.object().shape({
    name:yup.string().required("nome obrigatorio"),
    email:yup.string().required("email obrigatorio").email("email invalido"),
    telephone:yup.string().required("telefone obigatorio").matches("^[0-9]{2} ([0-9]{5} [0-9]{4})", "telefone invalido"),
    country:yup.string(),
    birthDate:yup.string().required("sua data de nacimento").matches("^[0-9]{2}/([0-9]{2}/[0-9]{2})","cada valor tem que ir separado com um '/'"),
    password:yup.string().required("senha obrigatoria").matches("","sua senha tem que incluir uma letra mayuscula, uma letra minuscula, um numero, e um caracter especial"),
    confPassword:yup.string().required("senha tem que ser igual").matches(),
    log:yup.string().required("click the box").matches(true, "tem que dar click na box"),

  })

  const{
    register, 
    handleSubmit, 
    formState:{errors},
     } = useForm({
    resolver: yupResolver(formShema),
  });
  
  const onSubmitFunction = (data) =>  {
    setNome(
    [nome, data.name + " "]
    )
    setEmail(
    [email, data.email]
    )
    setTelephone(
    [telephone, data.telephone]
    )
    setCountry(
    [country, data.country]
    )
    setBirthDay(
    [ birthDay, data.birthDate ]
    )
  }
  const takeOut =()=>{
    setNome(
      [nome,  ]
    )
    setEmail(
    [email, ]
    )
    setTelephone(
    [telephone, ]
    )
    setCountry(
    [country, ]
    )
    setBirthDay(
    [ birthDay, ]
    )
  }
    useEffect(()=>{
     return ()=>{
       console.log("destruido")
      }
  },[nome])
  return ( 
      <div className="container">
        
         {nome.length > 1 ? (
         <section>
           <div>
             {nome}
           </div> 
           <div>
             {email}
           </div>
           <div>
             {telephone}
           </div>
           <div>
             {birthDay}
           </div>
           <div>
             {country}
           </div>
           <button onClick ={ takeOut }>return</button>
         </section>
         ):(
      <div>
        <h3 >formulario</h3>
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <input placeholder="Nome de usuario*" {...register("name")} />
          {errors.name?.message}
          <input placeholder="Email*" {...register("email")}  />
          {errors.email?.message}
          <input placeholder="Telephone*" {...register("telephone")}   />
          {errors.telephone?.message}
          <input placeholder="Country" {...register("country")}   />
          {errors.country?.message}
          <input placeholder="dia mes ano"{...register("birthDate")} />
          {errors.birthDate?.message}
          <input type="password"placeholder="senha" {...register("password")}/>
          {errors.password?.message}
          <input type="password" placeholder="confirmar senha"{...register("confPassword")} />
          {errors.confPassword?.message}
          <input type="checkbox" {...register("log")}/><p>aceita os terminos</p>
          {errors.log?.message}
          <button type = "submit">Enviar</button>
        </form>
      </div>
         )}
    </div>
  );
}

export default App;
