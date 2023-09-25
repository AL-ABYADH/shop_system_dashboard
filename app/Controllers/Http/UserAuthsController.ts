import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UserAuthsController {
  public async register({ request }: HttpContextContract) {
    // Validate the request data
    const validationSchema = schema.create({
      phoneNumber: schema.string({}, [
        rules.unique({ table: "users", column: "phone_number" }),
      ]),
      fullName: schema.string(),
      password: schema.string(),
    });

    const data = await request.validate({ schema: validationSchema });

    // Check if the user already exists
    const existingUser = await User.query()
      .where("phone_number", data.phoneNumber)
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }
    console.log(data.password);

    data.password = await Hash.make(data.password);

    const user = await User.create(data);

    return user;
  }

  public async login({ request, auth }: HttpContextContract) {
    const { phoneNumber, password } = request.only(["phoneNumber", "password"]);

    console.log("Received phoneNumber:", phoneNumber);
    console.log(password);

    try {
      // const user = await User.query().where("phone_number", phoneNumber).first();
      const user = await Database.from("users")
        .select("*")
        .where("phone_number", phoneNumber)
        .first();

      if (!user) {
        console.error("User not found");
        throw new Error("User not found");
      }

      const isPasswordValid = await Hash.verify(user.password, password);
      console.log(isPasswordValid);
      // if (!isPasswordValid) {
      //   console.error("Invalid password");
      //   throw new Error("Invalid password");
      // }

      const token = await auth.use("api").generate(user);
      return token.toJSON();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
