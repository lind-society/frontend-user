/* eslint-disable @typescript-eslint/no-explicit-any */
export type TDraggableImageInputProps<T extends FieldValues> =
  UseControllerProps<T> & {
    multiple?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    name: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    files?: string;
    value?: string;
    accepted?: string;
    onDrop?: (acceptedFiles: any) => void;
    path?: File;
    type?: string;
    // variant: 'sm' | 'md' | 'lg';
    status?: 'error' | 'success' | 'warning' | 'none';
    message?: string;
    postType?: string;
    labelStyle?: string;
    // setResult it will be set null to
    setResult?: (result: any) => void;
    setTab?: (tab: 'idle' | 'result' | 'history' | 'detail-history') => void;
    isLoading: boolean;
    fileInfo?: {
      type: string;
      name: string;
    };
    setFileInfo?: (info: { type: string; name: string }) => void;
  };
