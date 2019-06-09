import {
  Resolver,
  Query,
  Args,
  ArgsType,
  Authorized,
  Mutation,
  Arg,
  InputType,
  Field,
  ID,
} from "type-graphql";
import { User, Provider, Status, Role } from "../entity/User";

@ArgsType()
class SearchUserArgs implements Partial<User> {
  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Role)
  role: Role;

  @Field(() => Provider)
  provider: Provider;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ArgsType()
class GetUserArgs {
  @Field(() => ID)
  id: number;
}

@InputType()
class UserInput {
  @Field()
  displayName: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Role)
  role: Role;
}

@InputType()
class UpdateUserInput {
  @Field(() => UserInput)
  user: UserInput;

  @Field(() => ID)
  id: number;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  @Authorized([Role.ADMIN])
  async searchUser(@Args() args: SearchUserArgs): Promise<User[]> {
    return User.find({ ...args });
  }

  @Query(() => User)
  @Authorized([Role.ADMIN])
  async getUser(@Args() args: GetUserArgs): Promise<User> {
    return User.findOneOrFail({ id: args.id });
  }

  @Mutation(() => Boolean)
  @Authorized([Role.ADMIN])
  async updateUser(@Arg("data") input: UpdateUserInput): Promise<Boolean> {
    await User.findOneOrFail({ id: input.id });
    await User.validate(input.user);
    await User.update({ id: input.id }, { ...input.user });
    return true;
  }
}