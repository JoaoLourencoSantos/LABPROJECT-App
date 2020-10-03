import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ name: 'reference_at' })
  referenceAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
