interface CardConfig {
  color: string;
  title: string;
  subtitle?: string;
  amount?: number;
  amountSuffix?: string;
  amountPrefix?: string;
  amountFontSize?: number;
  ofAmount?: number;
  icon: string;
  link?: string;
  percentage?: number;
  down?: boolean;
  withAction:boolean;
}


export {CardConfig};
