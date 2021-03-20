import {Field} from 'type-graphql';
import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import {User} from './User';
import {Post} from './Post';

@Entity()
export class Updoot extends BaseEntity {
  @Column({type: 'int'})
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @Field()
  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post;
}
