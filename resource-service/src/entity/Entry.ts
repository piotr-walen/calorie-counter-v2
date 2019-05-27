import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";
import { Meal } from "./Meal";

@ObjectType()
@Entity()
export class Entry extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Product])
  @ManyToOne(() => Product, p => p.entries)
  @JoinTable()
  product: Product;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Meal)
  @OneToMany(() => Meal, m => m.entries)
  meal: Meal;

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
