export type Package = {
  id: number;
  name: string;
  category: string;
  description: string;
  url: string;
  publication: string;
  license: {
    label: string;
    url: string;
  };
}