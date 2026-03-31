import { Button, Card, Form, Hero, Input } from "react-daisyui";
import { Link } from "react-router-dom";

function LoginSceen() {
  return (
    <>
      <Hero className="hero bg-base-200 min-h-screen">
        <Hero.Content className="flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <Card className="shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Card.Body>
              <Form>
                <Form.Label title="Email" />
                <Input
                  type="text"
                  placeholder="email"
                  className="input-bordered"
                />
              </Form>
              <Form>
                <Form.Label title="Password" />
                <Input
                  type="text"
                  placeholder="password"
                  className="input-bordered"
                />
                <label className="label">
                  <Link to="/register" className="label-text-alt">
                    Forgot password?
                  </Link>
                  <Link to="/register">Register</Link>
                </label>
              </Form>
              <Form className="mt-6">
                <Button>Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Hero.Content>
      </Hero>
    </>
  );
}

export default LoginSceen;
