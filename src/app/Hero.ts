import { Role } from './role.enum';

export class Hero {

  constructor(
    private id: number,
    private name: string,
    private role: Role,
    private INT: number,
    private DEX: number,
    private STR: number) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.INT = INT;
    this.DEX = DEX;
    this.STR = STR;
    this.health = 100;
    this.mana = 100;
    this.experience = 0;
  }
  private health: number;
  private mana: number;
  private experience: number;

  public static getRandomRole(): Role {
    return Math.floor(Math.random() * Object.keys(Role).length / 2);
  }

  public getName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public getRole(): Role {
    return this.role;
  }

  public getRoleName(): string {
    return Role[this.role];
  }

  public getINT(): number {
    return this.INT;
  }

  public getDEX(): number {
    return this.DEX;
  }

  public getSTR(): number {
    return this.STR;
  }

  public getHP(): number {
    return this.health;
  }

  public getMinAttack(): number {
    return Math.floor((this.DEX + (this.STR / 2)) / 2);
  }

  public getMaxAttack(): number {
    return Math.floor(((this.DEX / 2) + this.STR) / 1.5);
  }

  public receiveDamage(damage: number): void {
    this.health -= damage;
  }
}
