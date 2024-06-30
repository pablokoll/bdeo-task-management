export interface ConfigLoader {
  environment: string;
  port: number;
  database_url: string;
  database_name: string;
  testing: boolean;
}
