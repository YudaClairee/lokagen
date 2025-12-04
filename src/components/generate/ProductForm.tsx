"use client";

import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
        <Label htmlFor="productName" className="mb-2 block text-slate-200">
          Nama Produk{" "}
          <span className="text-slate-500">(opsional)</span>
        </Label>
        <Input
          id="productName"
          type="text"
          placeholder="Contoh: Kopi Arabika Toraja Premium"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500"
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label className="mb-2 block text-slate-200">Foto Produk</Label>
        <div className="relative">
          {productImage ? (
            <div className="group relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border border-white/10">
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
            <label className="flex aspect-square w-full max-w-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/20 bg-slate-800/50 transition-colors hover:border-primary hover:bg-slate-800">
              <ImagePlus className="h-8 w-8 text-slate-400" />
              <span className="text-sm text-slate-400">
                Upload gambar
              </span>
              <span className="text-xs text-slate-500">Max 5MB</span>
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
        <Label htmlFor="description" className="mb-2 block text-slate-200">
          Deskripsi Produk{" "}
          <span className="text-slate-500">(opsional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Contoh: Kopi arabika premium dari Toraja, roasting medium, cocok untuk pecinta kopi yang suka rasa smooth..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="resize-none border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">
          Jelaskan produkmu: nama, jenis, keunggulan, harga, atau info lainnya
        </p>
      </div>
    </div>
  );
}

