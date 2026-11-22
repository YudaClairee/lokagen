"use client";

import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { compressImageFile } from "@/lib/utils";
import { VALIDATION } from "@/lib/constants";

interface ProductFormProps {
  productName: string;
  setProductName: (name: string) => void;
  productImage: string;
  setProductImage: (image: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export function ProductForm({
  productName,
  setProductName,
  productImage,
  setProductImage,
  description,
  setDescription,
}: ProductFormProps) {
  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar!");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 5MB!");
        return;
      }

      // Kompres di klien (maks 1080px, JPEG) agar payload Server Action kecil
      try {
        const compressed = await compressImageFile(file);
        setProductImage(compressed);
      } catch (error) {
        console.error("Gagal memproses gambar:", error);
        alert("Gambar tidak bisa diproses. Coba gambar lain ya!");
      }
    },
    [setProductImage]
  );

  const handleRemoveImage = useCallback(() => {
    setProductImage("");
  }, [setProductImage]);

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <div>
        <Label htmlFor="productName" className="mb-2 block text-foreground/80">
          Nama Produk{" "}
          <span className="text-muted-foreground">(opsional)</span>
        </Label>
        <Input
          id="productName"
          type="text"
          placeholder="Contoh: Kopi Arabika Toraja Premium"
          value={productName}
          maxLength={VALIDATION.MAX_PRODUCT_NAME_LENGTH}
          onChange={(e) => setProductName(e.target.value)}
          className="border-border bg-card text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label className="mb-2 block text-foreground/80">Foto Produk</Label>
        <div className="relative">
          {productImage ? (
            <div className="group relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border border-border">
              <Image
                src={productImage}
                alt="Product preview"
                fill
                className="object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex aspect-square w-full max-w-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card transition-colors hover:border-primary hover:bg-muted">
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Upload gambar
              </span>
              <span className="text-xs text-muted-foreground">Max 5MB (otomatis dikompres)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="mb-2 block text-foreground/80">
          Deskripsi Produk{" "}
          <span className="text-muted-foreground">(opsional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Contoh: Kopi arabika premium dari Toraja, roasting medium, cocok untuk pecinta kopi yang suka rasa smooth..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          maxLength={VALIDATION.MAX_DESCRIPTION_LENGTH}
          className="resize-none border-border bg-card text-foreground placeholder:text-muted-foreground"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>Jelaskan produkmu: nama, jenis, keunggulan, atau info lainnya</span>
          <span>{description.length}/{VALIDATION.MAX_DESCRIPTION_LENGTH}</span>
        </div>
      </div>
    </div>
  );
}

