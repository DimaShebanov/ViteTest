export interface LoadingStore {
  loading: boolean;
  set: (loading: boolean) => void;
}
