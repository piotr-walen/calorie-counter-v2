import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Entry } from "./Entry";

@ObjectType()
@Entity()
@Unique(["createdById", "date", "name"])
export class Meal extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  name: string;

  @ManyToOne(() => Entry, e => e.meal)
  entries: Entry[];

  @Field(() => Date)
  @Column()
  date: Date;

  @Field(() => ID)
  @Column()
  createdById: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => ID)
  @Column()
  updatedById: number;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;
}
