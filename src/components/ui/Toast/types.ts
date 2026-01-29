export type TToast = {
  id: number;
  message: string;
};

export type TToastContext = {
  showToast: (message: string) => void;
};
