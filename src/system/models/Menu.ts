import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({
    nullable: true,
  })
  parentId?: number

  @ManyToOne(() => Menu, (menu) => menu.submenus)
  // @JoinColumn({
  //   name: 'parentId',
  //   referencedColumnName: 'id',
  // })
  parent?: Menu

  @OneToMany(() => Menu, (menu) => menu.parent)
  @JoinColumn({
    name: 'parentId',
  })
  submenus?: Menu[]
}
