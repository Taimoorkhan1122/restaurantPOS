import Authform from "../components/Authform";
import { mode } from "../utils/constansts";

const Signin = () => {
  return <Authform mode={mode.SIGNIN} />;
};

Signin.authPage = true;

export default Signin;
