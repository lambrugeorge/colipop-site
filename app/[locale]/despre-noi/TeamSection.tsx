"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Member = { name: string; role: string; image: string };

export default function TeamSection({
  team,
  title,
}: {
  team: Member[];
  title: string;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-[#F79A19]">{title}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            className="overflow-hidden rounded-xl border-2 border-[#E8DDB8] bg-white shadow-lg hover:border-[#F79A19]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="relative aspect-square bg-[#F7E396]/30">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#FACE68]/30 text-2xl font-bold text-[#1a1510]/50">
                {member.name.slice(0, 1)}
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-[#1a1510]">{member.name}</p>
              <p className="text-sm text-[#F79A19]">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
