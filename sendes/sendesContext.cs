using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PlantationGenie.sendes
{
    public partial class sendesContext : DbContext
    {
        public sendesContext()
        {
        }

        public sendesContext(DbContextOptions<sendesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Device> Device { get; set; }
        public virtual DbSet<Devicetype> Devicetype { get; set; }
        public virtual DbSet<Plant> Plant { get; set; }
        public virtual DbSet<User> User { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>(entity =>
            {
                entity.ToTable("device");

                entity.HasIndex(e => e.DeviceType)
                    .HasName("deviceType");

                entity.HasIndex(e => e.PlantMonitering)
                    .HasName("plantMonitering");

                entity.HasIndex(e => e.RegisteredUser)
                    .HasName("registeredUser");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.DeviceName)
                    .HasColumnName("deviceName")
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("'Default'")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.DeviceType)
                    .IsRequired()
                    .HasColumnName("deviceType")
                    .HasColumnType("char(1)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.MoistureLevel)
                    .HasColumnName("moistureLevel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.PlantMonitering)
                    .HasColumnName("plantMonitering")
                    .HasColumnType("varchar(50)")
                    .HasDefaultValueSql("'Default'")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.RegisteredUser)
                    .HasColumnName("registeredUser")
                    .HasColumnType("varchar(50)")
                    .HasDefaultValueSql("'Default User'")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.WaterLevel)
                    .HasColumnName("waterLevel")
                    .HasColumnType("decimal(4,1)");

                entity.HasOne(d => d.DeviceTypeNavigation)
                    .WithMany(p => p.Device)
                    .HasForeignKey(d => d.DeviceType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("device_ibfk_3");

                entity.HasOne(d => d.PlantMoniteringNavigation)
                    .WithMany(p => p.Device)
                    .HasForeignKey(d => d.PlantMonitering)
                    .HasConstraintName("device_ibfk_2");

                entity.HasOne(d => d.RegisteredUserNavigation)
                    .WithMany(p => p.Device)
                    .HasForeignKey(d => d.RegisteredUser)
                    .HasConstraintName("device_ibfk_1");
            });

            modelBuilder.Entity<Devicetype>(entity =>
            {
                entity.HasKey(e => e.Size)
                    .HasName("PRIMARY");

                entity.ToTable("devicetype");

                entity.Property(e => e.Size)
                    .HasColumnName("size")
                    .HasColumnType("char(1)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.IsInStock).HasColumnName("isInStock");

                entity.Property(e => e.TankSize)
                    .HasColumnName("tankSize")
                    .HasColumnType("decimal(4,1)");
            });

            modelBuilder.Entity<Plant>(entity =>
            {
                entity.HasKey(e => e.Name)
                    .HasName("PRIMARY");

                entity.ToTable("plant");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(20)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.RecommendedMoisture)
                    .HasColumnName("recommendedMoisture")
                    .HasColumnType("decimal(2,2)");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserName)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.Property(e => e.UserName)
                    .HasColumnName("userName")
                    .HasColumnType("varchar(20)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(40)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasColumnType("varchar(20)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastName")
                    .HasColumnType("varchar(20)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("varchar(100)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Salt)
                    .HasColumnName("salt")
                    .HasColumnType("varchar(100)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
