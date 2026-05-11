import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model CanvasImage
 *
 */
export type CanvasImageModel = runtime.Types.Result.DefaultSelection<Prisma.$CanvasImagePayload>;
export type AggregateCanvasImage = {
    _count: CanvasImageCountAggregateOutputType | null;
    _avg: CanvasImageAvgAggregateOutputType | null;
    _sum: CanvasImageSumAggregateOutputType | null;
    _min: CanvasImageMinAggregateOutputType | null;
    _max: CanvasImageMaxAggregateOutputType | null;
};
export type CanvasImageAvgAggregateOutputType = {
    id: number | null;
    roomId: number | null;
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
};
export type CanvasImageSumAggregateOutputType = {
    id: number | null;
    roomId: number | null;
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
};
export type CanvasImageMinAggregateOutputType = {
    id: number | null;
    roomId: number | null;
    userId: string | null;
    imageUrl: string | null;
    publicId: string | null;
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CanvasImageMaxAggregateOutputType = {
    id: number | null;
    roomId: number | null;
    userId: string | null;
    imageUrl: string | null;
    publicId: string | null;
    x: number | null;
    y: number | null;
    width: number | null;
    height: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CanvasImageCountAggregateOutputType = {
    id: number;
    roomId: number;
    userId: number;
    imageUrl: number;
    publicId: number;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CanvasImageAvgAggregateInputType = {
    id?: true;
    roomId?: true;
    x?: true;
    y?: true;
    width?: true;
    height?: true;
};
export type CanvasImageSumAggregateInputType = {
    id?: true;
    roomId?: true;
    x?: true;
    y?: true;
    width?: true;
    height?: true;
};
export type CanvasImageMinAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    imageUrl?: true;
    publicId?: true;
    x?: true;
    y?: true;
    width?: true;
    height?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CanvasImageMaxAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    imageUrl?: true;
    publicId?: true;
    x?: true;
    y?: true;
    width?: true;
    height?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CanvasImageCountAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    imageUrl?: true;
    publicId?: true;
    x?: true;
    y?: true;
    width?: true;
    height?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CanvasImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CanvasImage to aggregate.
     */
    where?: Prisma.CanvasImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CanvasImages to fetch.
     */
    orderBy?: Prisma.CanvasImageOrderByWithRelationInput | Prisma.CanvasImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CanvasImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CanvasImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CanvasImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CanvasImages
    **/
    _count?: true | CanvasImageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CanvasImageAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CanvasImageSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CanvasImageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CanvasImageMaxAggregateInputType;
};
export type GetCanvasImageAggregateType<T extends CanvasImageAggregateArgs> = {
    [P in keyof T & keyof AggregateCanvasImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCanvasImage[P]> : Prisma.GetScalarType<T[P], AggregateCanvasImage[P]>;
};
export type CanvasImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CanvasImageWhereInput;
    orderBy?: Prisma.CanvasImageOrderByWithAggregationInput | Prisma.CanvasImageOrderByWithAggregationInput[];
    by: Prisma.CanvasImageScalarFieldEnum[] | Prisma.CanvasImageScalarFieldEnum;
    having?: Prisma.CanvasImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CanvasImageCountAggregateInputType | true;
    _avg?: CanvasImageAvgAggregateInputType;
    _sum?: CanvasImageSumAggregateInputType;
    _min?: CanvasImageMinAggregateInputType;
    _max?: CanvasImageMaxAggregateInputType;
};
export type CanvasImageGroupByOutputType = {
    id: number;
    roomId: number;
    userId: string;
    imageUrl: string;
    publicId: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt: Date;
    updatedAt: Date;
    _count: CanvasImageCountAggregateOutputType | null;
    _avg: CanvasImageAvgAggregateOutputType | null;
    _sum: CanvasImageSumAggregateOutputType | null;
    _min: CanvasImageMinAggregateOutputType | null;
    _max: CanvasImageMaxAggregateOutputType | null;
};
export type GetCanvasImageGroupByPayload<T extends CanvasImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CanvasImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CanvasImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CanvasImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CanvasImageGroupByOutputType[P]>;
}>>;
export type CanvasImageWhereInput = {
    AND?: Prisma.CanvasImageWhereInput | Prisma.CanvasImageWhereInput[];
    OR?: Prisma.CanvasImageWhereInput[];
    NOT?: Prisma.CanvasImageWhereInput | Prisma.CanvasImageWhereInput[];
    id?: Prisma.IntFilter<"CanvasImage"> | number;
    roomId?: Prisma.IntFilter<"CanvasImage"> | number;
    userId?: Prisma.StringFilter<"CanvasImage"> | string;
    imageUrl?: Prisma.StringFilter<"CanvasImage"> | string;
    publicId?: Prisma.StringNullableFilter<"CanvasImage"> | string | null;
    x?: Prisma.FloatFilter<"CanvasImage"> | number;
    y?: Prisma.FloatFilter<"CanvasImage"> | number;
    width?: Prisma.FloatFilter<"CanvasImage"> | number;
    height?: Prisma.FloatFilter<"CanvasImage"> | number;
    createdAt?: Prisma.DateTimeFilter<"CanvasImage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CanvasImage"> | Date | string;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CanvasImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    room?: Prisma.RoomOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CanvasImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.CanvasImageWhereInput | Prisma.CanvasImageWhereInput[];
    OR?: Prisma.CanvasImageWhereInput[];
    NOT?: Prisma.CanvasImageWhereInput | Prisma.CanvasImageWhereInput[];
    roomId?: Prisma.IntFilter<"CanvasImage"> | number;
    userId?: Prisma.StringFilter<"CanvasImage"> | string;
    imageUrl?: Prisma.StringFilter<"CanvasImage"> | string;
    publicId?: Prisma.StringNullableFilter<"CanvasImage"> | string | null;
    x?: Prisma.FloatFilter<"CanvasImage"> | number;
    y?: Prisma.FloatFilter<"CanvasImage"> | number;
    width?: Prisma.FloatFilter<"CanvasImage"> | number;
    height?: Prisma.FloatFilter<"CanvasImage"> | number;
    createdAt?: Prisma.DateTimeFilter<"CanvasImage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CanvasImage"> | Date | string;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type CanvasImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CanvasImageCountOrderByAggregateInput;
    _avg?: Prisma.CanvasImageAvgOrderByAggregateInput;
    _max?: Prisma.CanvasImageMaxOrderByAggregateInput;
    _min?: Prisma.CanvasImageMinOrderByAggregateInput;
    _sum?: Prisma.CanvasImageSumOrderByAggregateInput;
};
export type CanvasImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.CanvasImageScalarWhereWithAggregatesInput | Prisma.CanvasImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.CanvasImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CanvasImageScalarWhereWithAggregatesInput | Prisma.CanvasImageScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"CanvasImage"> | number;
    roomId?: Prisma.IntWithAggregatesFilter<"CanvasImage"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"CanvasImage"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"CanvasImage"> | string;
    publicId?: Prisma.StringNullableWithAggregatesFilter<"CanvasImage"> | string | null;
    x?: Prisma.FloatWithAggregatesFilter<"CanvasImage"> | number;
    y?: Prisma.FloatWithAggregatesFilter<"CanvasImage"> | number;
    width?: Prisma.FloatWithAggregatesFilter<"CanvasImage"> | number;
    height?: Prisma.FloatWithAggregatesFilter<"CanvasImage"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CanvasImage"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CanvasImage"> | Date | string;
};
export type CanvasImageCreateInput = {
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutCanvasImagesInput;
    user: Prisma.UserCreateNestedOneWithoutCanvasImagesInput;
};
export type CanvasImageUncheckedCreateInput = {
    id?: number;
    roomId: number;
    userId: string;
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CanvasImageUpdateInput = {
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutCanvasImagesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutCanvasImagesNestedInput;
};
export type CanvasImageUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    roomId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CanvasImageCreateManyInput = {
    id?: number;
    roomId: number;
    userId: string;
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CanvasImageUpdateManyMutationInput = {
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CanvasImageUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    roomId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CanvasImageListRelationFilter = {
    every?: Prisma.CanvasImageWhereInput;
    some?: Prisma.CanvasImageWhereInput;
    none?: Prisma.CanvasImageWhereInput;
};
export type CanvasImageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CanvasImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CanvasImageAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type CanvasImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CanvasImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CanvasImageSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    y?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type CanvasImageCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutUserInput, Prisma.CanvasImageUncheckedCreateWithoutUserInput> | Prisma.CanvasImageCreateWithoutUserInput[] | Prisma.CanvasImageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutUserInput | Prisma.CanvasImageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CanvasImageCreateManyUserInputEnvelope;
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
};
export type CanvasImageUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutUserInput, Prisma.CanvasImageUncheckedCreateWithoutUserInput> | Prisma.CanvasImageCreateWithoutUserInput[] | Prisma.CanvasImageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutUserInput | Prisma.CanvasImageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CanvasImageCreateManyUserInputEnvelope;
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
};
export type CanvasImageUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutUserInput, Prisma.CanvasImageUncheckedCreateWithoutUserInput> | Prisma.CanvasImageCreateWithoutUserInput[] | Prisma.CanvasImageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutUserInput | Prisma.CanvasImageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CanvasImageUpsertWithWhereUniqueWithoutUserInput | Prisma.CanvasImageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CanvasImageCreateManyUserInputEnvelope;
    set?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    disconnect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    delete?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    update?: Prisma.CanvasImageUpdateWithWhereUniqueWithoutUserInput | Prisma.CanvasImageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CanvasImageUpdateManyWithWhereWithoutUserInput | Prisma.CanvasImageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CanvasImageScalarWhereInput | Prisma.CanvasImageScalarWhereInput[];
};
export type CanvasImageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutUserInput, Prisma.CanvasImageUncheckedCreateWithoutUserInput> | Prisma.CanvasImageCreateWithoutUserInput[] | Prisma.CanvasImageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutUserInput | Prisma.CanvasImageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CanvasImageUpsertWithWhereUniqueWithoutUserInput | Prisma.CanvasImageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CanvasImageCreateManyUserInputEnvelope;
    set?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    disconnect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    delete?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    update?: Prisma.CanvasImageUpdateWithWhereUniqueWithoutUserInput | Prisma.CanvasImageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CanvasImageUpdateManyWithWhereWithoutUserInput | Prisma.CanvasImageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CanvasImageScalarWhereInput | Prisma.CanvasImageScalarWhereInput[];
};
export type CanvasImageCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutRoomInput, Prisma.CanvasImageUncheckedCreateWithoutRoomInput> | Prisma.CanvasImageCreateWithoutRoomInput[] | Prisma.CanvasImageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutRoomInput | Prisma.CanvasImageCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.CanvasImageCreateManyRoomInputEnvelope;
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
};
export type CanvasImageUncheckedCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutRoomInput, Prisma.CanvasImageUncheckedCreateWithoutRoomInput> | Prisma.CanvasImageCreateWithoutRoomInput[] | Prisma.CanvasImageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutRoomInput | Prisma.CanvasImageCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.CanvasImageCreateManyRoomInputEnvelope;
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
};
export type CanvasImageUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutRoomInput, Prisma.CanvasImageUncheckedCreateWithoutRoomInput> | Prisma.CanvasImageCreateWithoutRoomInput[] | Prisma.CanvasImageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutRoomInput | Prisma.CanvasImageCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.CanvasImageUpsertWithWhereUniqueWithoutRoomInput | Prisma.CanvasImageUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.CanvasImageCreateManyRoomInputEnvelope;
    set?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    disconnect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    delete?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    update?: Prisma.CanvasImageUpdateWithWhereUniqueWithoutRoomInput | Prisma.CanvasImageUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.CanvasImageUpdateManyWithWhereWithoutRoomInput | Prisma.CanvasImageUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.CanvasImageScalarWhereInput | Prisma.CanvasImageScalarWhereInput[];
};
export type CanvasImageUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.CanvasImageCreateWithoutRoomInput, Prisma.CanvasImageUncheckedCreateWithoutRoomInput> | Prisma.CanvasImageCreateWithoutRoomInput[] | Prisma.CanvasImageUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.CanvasImageCreateOrConnectWithoutRoomInput | Prisma.CanvasImageCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.CanvasImageUpsertWithWhereUniqueWithoutRoomInput | Prisma.CanvasImageUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.CanvasImageCreateManyRoomInputEnvelope;
    set?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    disconnect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    delete?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    connect?: Prisma.CanvasImageWhereUniqueInput | Prisma.CanvasImageWhereUniqueInput[];
    update?: Prisma.CanvasImageUpdateWithWhereUniqueWithoutRoomInput | Prisma.CanvasImageUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.CanvasImageUpdateManyWithWhereWithoutRoomInput | Prisma.CanvasImageUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.CanvasImageScalarWhereInput | Prisma.CanvasImageScalarWhereInput[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type CanvasImageCreateWithoutUserInput = {
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutCanvasImagesInput;
};
export type CanvasImageUncheckedCreateWithoutUserInput = {
    id?: number;
    roomId: number;
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CanvasImageCreateOrConnectWithoutUserInput = {
    where: Prisma.CanvasImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.CanvasImageCreateWithoutUserInput, Prisma.CanvasImageUncheckedCreateWithoutUserInput>;
};
export type CanvasImageCreateManyUserInputEnvelope = {
    data: Prisma.CanvasImageCreateManyUserInput | Prisma.CanvasImageCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CanvasImageUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CanvasImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.CanvasImageUpdateWithoutUserInput, Prisma.CanvasImageUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CanvasImageCreateWithoutUserInput, Prisma.CanvasImageUncheckedCreateWithoutUserInput>;
};
export type CanvasImageUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CanvasImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.CanvasImageUpdateWithoutUserInput, Prisma.CanvasImageUncheckedUpdateWithoutUserInput>;
};
export type CanvasImageUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CanvasImageScalarWhereInput;
    data: Prisma.XOR<Prisma.CanvasImageUpdateManyMutationInput, Prisma.CanvasImageUncheckedUpdateManyWithoutUserInput>;
};
export type CanvasImageScalarWhereInput = {
    AND?: Prisma.CanvasImageScalarWhereInput | Prisma.CanvasImageScalarWhereInput[];
    OR?: Prisma.CanvasImageScalarWhereInput[];
    NOT?: Prisma.CanvasImageScalarWhereInput | Prisma.CanvasImageScalarWhereInput[];
    id?: Prisma.IntFilter<"CanvasImage"> | number;
    roomId?: Prisma.IntFilter<"CanvasImage"> | number;
    userId?: Prisma.StringFilter<"CanvasImage"> | string;
    imageUrl?: Prisma.StringFilter<"CanvasImage"> | string;
    publicId?: Prisma.StringNullableFilter<"CanvasImage"> | string | null;
    x?: Prisma.FloatFilter<"CanvasImage"> | number;
    y?: Prisma.FloatFilter<"CanvasImage"> | number;
    width?: Prisma.FloatFilter<"CanvasImage"> | number;
    height?: Prisma.FloatFilter<"CanvasImage"> | number;
    createdAt?: Prisma.DateTimeFilter<"CanvasImage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CanvasImage"> | Date | string;
};
export type CanvasImageCreateWithoutRoomInput = {
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCanvasImagesInput;
};
export type CanvasImageUncheckedCreateWithoutRoomInput = {
    id?: number;
    userId: string;
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CanvasImageCreateOrConnectWithoutRoomInput = {
    where: Prisma.CanvasImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.CanvasImageCreateWithoutRoomInput, Prisma.CanvasImageUncheckedCreateWithoutRoomInput>;
};
export type CanvasImageCreateManyRoomInputEnvelope = {
    data: Prisma.CanvasImageCreateManyRoomInput | Prisma.CanvasImageCreateManyRoomInput[];
    skipDuplicates?: boolean;
};
export type CanvasImageUpsertWithWhereUniqueWithoutRoomInput = {
    where: Prisma.CanvasImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.CanvasImageUpdateWithoutRoomInput, Prisma.CanvasImageUncheckedUpdateWithoutRoomInput>;
    create: Prisma.XOR<Prisma.CanvasImageCreateWithoutRoomInput, Prisma.CanvasImageUncheckedCreateWithoutRoomInput>;
};
export type CanvasImageUpdateWithWhereUniqueWithoutRoomInput = {
    where: Prisma.CanvasImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.CanvasImageUpdateWithoutRoomInput, Prisma.CanvasImageUncheckedUpdateWithoutRoomInput>;
};
export type CanvasImageUpdateManyWithWhereWithoutRoomInput = {
    where: Prisma.CanvasImageScalarWhereInput;
    data: Prisma.XOR<Prisma.CanvasImageUpdateManyMutationInput, Prisma.CanvasImageUncheckedUpdateManyWithoutRoomInput>;
};
export type CanvasImageCreateManyUserInput = {
    id?: number;
    roomId: number;
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CanvasImageUpdateWithoutUserInput = {
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutCanvasImagesNestedInput;
};
export type CanvasImageUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    roomId?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CanvasImageUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    roomId?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CanvasImageCreateManyRoomInput = {
    id?: number;
    userId: string;
    imageUrl: string;
    publicId?: string | null;
    x: number;
    y: number;
    width: number;
    height: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CanvasImageUpdateWithoutRoomInput = {
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCanvasImagesNestedInput;
};
export type CanvasImageUncheckedUpdateWithoutRoomInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CanvasImageUncheckedUpdateManyWithoutRoomInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.FloatFieldUpdateOperationsInput | number;
    y?: Prisma.FloatFieldUpdateOperationsInput | number;
    width?: Prisma.FloatFieldUpdateOperationsInput | number;
    height?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CanvasImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    x?: boolean;
    y?: boolean;
    width?: boolean;
    height?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["canvasImage"]>;
export type CanvasImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    x?: boolean;
    y?: boolean;
    width?: boolean;
    height?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["canvasImage"]>;
export type CanvasImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    x?: boolean;
    y?: boolean;
    width?: boolean;
    height?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["canvasImage"]>;
export type CanvasImageSelectScalar = {
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    x?: boolean;
    y?: boolean;
    width?: boolean;
    height?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CanvasImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "roomId" | "userId" | "imageUrl" | "publicId" | "x" | "y" | "width" | "height" | "createdAt" | "updatedAt", ExtArgs["result"]["canvasImage"]>;
export type CanvasImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CanvasImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CanvasImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CanvasImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CanvasImage";
    objects: {
        room: Prisma.$RoomPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        roomId: number;
        userId: string;
        imageUrl: string;
        publicId: string | null;
        x: number;
        y: number;
        width: number;
        height: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["canvasImage"]>;
    composites: {};
};
export type CanvasImageGetPayload<S extends boolean | null | undefined | CanvasImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload, S>;
export type CanvasImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CanvasImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CanvasImageCountAggregateInputType | true;
};
export interface CanvasImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CanvasImage'];
        meta: {
            name: 'CanvasImage';
        };
    };
    /**
     * Find zero or one CanvasImage that matches the filter.
     * @param {CanvasImageFindUniqueArgs} args - Arguments to find a CanvasImage
     * @example
     * // Get one CanvasImage
     * const canvasImage = await prisma.canvasImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CanvasImageFindUniqueArgs>(args: Prisma.SelectSubset<T, CanvasImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one CanvasImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CanvasImageFindUniqueOrThrowArgs} args - Arguments to find a CanvasImage
     * @example
     * // Get one CanvasImage
     * const canvasImage = await prisma.canvasImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CanvasImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CanvasImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CanvasImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasImageFindFirstArgs} args - Arguments to find a CanvasImage
     * @example
     * // Get one CanvasImage
     * const canvasImage = await prisma.canvasImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CanvasImageFindFirstArgs>(args?: Prisma.SelectSubset<T, CanvasImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CanvasImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasImageFindFirstOrThrowArgs} args - Arguments to find a CanvasImage
     * @example
     * // Get one CanvasImage
     * const canvasImage = await prisma.canvasImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CanvasImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CanvasImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more CanvasImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CanvasImages
     * const canvasImages = await prisma.canvasImage.findMany()
     *
     * // Get first 10 CanvasImages
     * const canvasImages = await prisma.canvasImage.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const canvasImageWithIdOnly = await prisma.canvasImage.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CanvasImageFindManyArgs>(args?: Prisma.SelectSubset<T, CanvasImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a CanvasImage.
     * @param {CanvasImageCreateArgs} args - Arguments to create a CanvasImage.
     * @example
     * // Create one CanvasImage
     * const CanvasImage = await prisma.canvasImage.create({
     *   data: {
     *     // ... data to create a CanvasImage
     *   }
     * })
     *
     */
    create<T extends CanvasImageCreateArgs>(args: Prisma.SelectSubset<T, CanvasImageCreateArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many CanvasImages.
     * @param {CanvasImageCreateManyArgs} args - Arguments to create many CanvasImages.
     * @example
     * // Create many CanvasImages
     * const canvasImage = await prisma.canvasImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CanvasImageCreateManyArgs>(args?: Prisma.SelectSubset<T, CanvasImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many CanvasImages and returns the data saved in the database.
     * @param {CanvasImageCreateManyAndReturnArgs} args - Arguments to create many CanvasImages.
     * @example
     * // Create many CanvasImages
     * const canvasImage = await prisma.canvasImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CanvasImages and only return the `id`
     * const canvasImageWithIdOnly = await prisma.canvasImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CanvasImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CanvasImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a CanvasImage.
     * @param {CanvasImageDeleteArgs} args - Arguments to delete one CanvasImage.
     * @example
     * // Delete one CanvasImage
     * const CanvasImage = await prisma.canvasImage.delete({
     *   where: {
     *     // ... filter to delete one CanvasImage
     *   }
     * })
     *
     */
    delete<T extends CanvasImageDeleteArgs>(args: Prisma.SelectSubset<T, CanvasImageDeleteArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one CanvasImage.
     * @param {CanvasImageUpdateArgs} args - Arguments to update one CanvasImage.
     * @example
     * // Update one CanvasImage
     * const canvasImage = await prisma.canvasImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CanvasImageUpdateArgs>(args: Prisma.SelectSubset<T, CanvasImageUpdateArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more CanvasImages.
     * @param {CanvasImageDeleteManyArgs} args - Arguments to filter CanvasImages to delete.
     * @example
     * // Delete a few CanvasImages
     * const { count } = await prisma.canvasImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CanvasImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, CanvasImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CanvasImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CanvasImages
     * const canvasImage = await prisma.canvasImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CanvasImageUpdateManyArgs>(args: Prisma.SelectSubset<T, CanvasImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CanvasImages and returns the data updated in the database.
     * @param {CanvasImageUpdateManyAndReturnArgs} args - Arguments to update many CanvasImages.
     * @example
     * // Update many CanvasImages
     * const canvasImage = await prisma.canvasImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CanvasImages and only return the `id`
     * const canvasImageWithIdOnly = await prisma.canvasImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CanvasImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CanvasImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one CanvasImage.
     * @param {CanvasImageUpsertArgs} args - Arguments to update or create a CanvasImage.
     * @example
     * // Update or create a CanvasImage
     * const canvasImage = await prisma.canvasImage.upsert({
     *   create: {
     *     // ... data to create a CanvasImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CanvasImage we want to update
     *   }
     * })
     */
    upsert<T extends CanvasImageUpsertArgs>(args: Prisma.SelectSubset<T, CanvasImageUpsertArgs<ExtArgs>>): Prisma.Prisma__CanvasImageClient<runtime.Types.Result.GetResult<Prisma.$CanvasImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of CanvasImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasImageCountArgs} args - Arguments to filter CanvasImages to count.
     * @example
     * // Count the number of CanvasImages
     * const count = await prisma.canvasImage.count({
     *   where: {
     *     // ... the filter for the CanvasImages we want to count
     *   }
     * })
    **/
    count<T extends CanvasImageCountArgs>(args?: Prisma.Subset<T, CanvasImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CanvasImageCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a CanvasImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CanvasImageAggregateArgs>(args: Prisma.Subset<T, CanvasImageAggregateArgs>): Prisma.PrismaPromise<GetCanvasImageAggregateType<T>>;
    /**
     * Group by CanvasImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends CanvasImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CanvasImageGroupByArgs['orderBy'];
    } : {
        orderBy?: CanvasImageGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CanvasImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCanvasImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CanvasImage model
     */
    readonly fields: CanvasImageFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for CanvasImage.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CanvasImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    room<T extends Prisma.RoomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the CanvasImage model
 */
export interface CanvasImageFieldRefs {
    readonly id: Prisma.FieldRef<"CanvasImage", 'Int'>;
    readonly roomId: Prisma.FieldRef<"CanvasImage", 'Int'>;
    readonly userId: Prisma.FieldRef<"CanvasImage", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"CanvasImage", 'String'>;
    readonly publicId: Prisma.FieldRef<"CanvasImage", 'String'>;
    readonly x: Prisma.FieldRef<"CanvasImage", 'Float'>;
    readonly y: Prisma.FieldRef<"CanvasImage", 'Float'>;
    readonly width: Prisma.FieldRef<"CanvasImage", 'Float'>;
    readonly height: Prisma.FieldRef<"CanvasImage", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"CanvasImage", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CanvasImage", 'DateTime'>;
}
/**
 * CanvasImage findUnique
 */
export type CanvasImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * Filter, which CanvasImage to fetch.
     */
    where: Prisma.CanvasImageWhereUniqueInput;
};
/**
 * CanvasImage findUniqueOrThrow
 */
export type CanvasImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * Filter, which CanvasImage to fetch.
     */
    where: Prisma.CanvasImageWhereUniqueInput;
};
/**
 * CanvasImage findFirst
 */
export type CanvasImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * Filter, which CanvasImage to fetch.
     */
    where?: Prisma.CanvasImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CanvasImages to fetch.
     */
    orderBy?: Prisma.CanvasImageOrderByWithRelationInput | Prisma.CanvasImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CanvasImages.
     */
    cursor?: Prisma.CanvasImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CanvasImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CanvasImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CanvasImages.
     */
    distinct?: Prisma.CanvasImageScalarFieldEnum | Prisma.CanvasImageScalarFieldEnum[];
};
/**
 * CanvasImage findFirstOrThrow
 */
export type CanvasImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * Filter, which CanvasImage to fetch.
     */
    where?: Prisma.CanvasImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CanvasImages to fetch.
     */
    orderBy?: Prisma.CanvasImageOrderByWithRelationInput | Prisma.CanvasImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CanvasImages.
     */
    cursor?: Prisma.CanvasImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CanvasImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CanvasImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CanvasImages.
     */
    distinct?: Prisma.CanvasImageScalarFieldEnum | Prisma.CanvasImageScalarFieldEnum[];
};
/**
 * CanvasImage findMany
 */
export type CanvasImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * Filter, which CanvasImages to fetch.
     */
    where?: Prisma.CanvasImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CanvasImages to fetch.
     */
    orderBy?: Prisma.CanvasImageOrderByWithRelationInput | Prisma.CanvasImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CanvasImages.
     */
    cursor?: Prisma.CanvasImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CanvasImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CanvasImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CanvasImages.
     */
    distinct?: Prisma.CanvasImageScalarFieldEnum | Prisma.CanvasImageScalarFieldEnum[];
};
/**
 * CanvasImage create
 */
export type CanvasImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * The data needed to create a CanvasImage.
     */
    data: Prisma.XOR<Prisma.CanvasImageCreateInput, Prisma.CanvasImageUncheckedCreateInput>;
};
/**
 * CanvasImage createMany
 */
export type CanvasImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many CanvasImages.
     */
    data: Prisma.CanvasImageCreateManyInput | Prisma.CanvasImageCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CanvasImage createManyAndReturn
 */
export type CanvasImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * The data used to create many CanvasImages.
     */
    data: Prisma.CanvasImageCreateManyInput | Prisma.CanvasImageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * CanvasImage update
 */
export type CanvasImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * The data needed to update a CanvasImage.
     */
    data: Prisma.XOR<Prisma.CanvasImageUpdateInput, Prisma.CanvasImageUncheckedUpdateInput>;
    /**
     * Choose, which CanvasImage to update.
     */
    where: Prisma.CanvasImageWhereUniqueInput;
};
/**
 * CanvasImage updateMany
 */
export type CanvasImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update CanvasImages.
     */
    data: Prisma.XOR<Prisma.CanvasImageUpdateManyMutationInput, Prisma.CanvasImageUncheckedUpdateManyInput>;
    /**
     * Filter which CanvasImages to update
     */
    where?: Prisma.CanvasImageWhereInput;
    /**
     * Limit how many CanvasImages to update.
     */
    limit?: number;
};
/**
 * CanvasImage updateManyAndReturn
 */
export type CanvasImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * The data used to update CanvasImages.
     */
    data: Prisma.XOR<Prisma.CanvasImageUpdateManyMutationInput, Prisma.CanvasImageUncheckedUpdateManyInput>;
    /**
     * Filter which CanvasImages to update
     */
    where?: Prisma.CanvasImageWhereInput;
    /**
     * Limit how many CanvasImages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * CanvasImage upsert
 */
export type CanvasImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * The filter to search for the CanvasImage to update in case it exists.
     */
    where: Prisma.CanvasImageWhereUniqueInput;
    /**
     * In case the CanvasImage found by the `where` argument doesn't exist, create a new CanvasImage with this data.
     */
    create: Prisma.XOR<Prisma.CanvasImageCreateInput, Prisma.CanvasImageUncheckedCreateInput>;
    /**
     * In case the CanvasImage was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CanvasImageUpdateInput, Prisma.CanvasImageUncheckedUpdateInput>;
};
/**
 * CanvasImage delete
 */
export type CanvasImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
    /**
     * Filter which CanvasImage to delete.
     */
    where: Prisma.CanvasImageWhereUniqueInput;
};
/**
 * CanvasImage deleteMany
 */
export type CanvasImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CanvasImages to delete
     */
    where?: Prisma.CanvasImageWhereInput;
    /**
     * Limit how many CanvasImages to delete.
     */
    limit?: number;
};
/**
 * CanvasImage without action
 */
export type CanvasImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CanvasImage
     */
    select?: Prisma.CanvasImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CanvasImage
     */
    omit?: Prisma.CanvasImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CanvasImageInclude<ExtArgs> | null;
};
//# sourceMappingURL=CanvasImage.d.ts.map