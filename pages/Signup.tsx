import Authform from "../components/Authform";
import { mode } from "../utils/constansts";

const Signup = () => {

  return <Authform mode={mode.SINGUP} />;
};

Signup.authPage = true;

export default Signup;
