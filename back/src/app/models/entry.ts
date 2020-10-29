import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Category from './category';

@Entity()
export default class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: false, type: 'decimal' })
  value: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  type: string;

  @OneToOne(type => Category)
  @JoinColumn()
  category: Category;

  @CreateDateColumn({ name: 'reference_at' })
  referenceAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
