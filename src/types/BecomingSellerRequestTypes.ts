type StatusTypes = "waiting" | "denied" | "allowed";

export type BecomingSellerRequestTypes = {
  _id: string;
  userId: string;
  status: StatusTypes;
  denyingReason?: string;
  createdAt: Date;
  updatedAt: Date;
};
